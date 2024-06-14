import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RecapsJSONInput } from "./recaps.model";
import { RecapsRepository } from "./recaps.repository";
import { RecapMapping } from "./dto/recap-mapping.input";

@Injectable()
export class RecapsServices {

  constructor(
    private repository: RecapsRepository,
  ) { }

  async insertRecapData(params: RecapsJSONInput) {
    const softwareCache: { [key: string]: any }[] = [];
    const courseCache: { [key: string]: any }[] = [];
    const departmentCache: { [key: string]: any }[] = [];
    const groupCache: { [key: string]: any }[] = [];
    const internetUsageCache: { [key: string]: any }[] = [];
    const masterCache: { [key: string]: any }[] = [];

    const data = await this.unpackRecapData(params);

    const getCacheValue = (cache: { [key: string]: any }[], key: string) => {
      const entry = cache.find(entry => Object.keys(entry)[0] === key);
      return entry ? Object.values(entry)[0] : null;
    };

    const getFromCache = async (key, cacheArray, repoFunction) => {
      if (!cacheArray.some(item => Object.keys(item)[0] == key)) {
        try {
          const value = repoFunction;
          cacheArray.push({ [key]: value });
          return value
        } catch (error) {
          return -1
        }
      } else {
        return getCacheValue(cacheArray, key)
      }
    }
    try {
      for (const dataItem of data) {
        const currentDepartment = await getFromCache(JSON.stringify(dataItem.department), departmentCache, this.repository.createDepartmentFromRecap(dataItem.department));
        const currentGroup = await getFromCache(JSON.stringify(dataItem.group), groupCache, this.repository.createGroupFromRecap(dataItem.group));
        dataItem.software.groupId = currentGroup;
        const currentSoftware = await getFromCache(JSON.stringify(dataItem.software), softwareCache, this.repository.createSoftwareFromRecap(dataItem.software));
        const currentInternetUsage = await getFromCache(JSON.stringify(dataItem.internetUsageType), internetUsageCache, this.repository.getInternetUsageFromRecap(dataItem.internetUsageType));
        const currentCourse = await getFromCache(JSON.stringify(dataItem.course.code), courseCache, this.repository.createCourseFromRecap(dataItem.course.code, currentDepartment, currentInternetUsage));
        const currentMasters = await getFromCache(JSON.stringify(dataItem.master), masterCache, this.repository.getMasterMapping(dataItem.master));

        const mapInput: RecapMapping = {
          softwareId: currentSoftware,
          courseId: currentCourse,
          groupId: currentGroup,
          departmentId: currentDepartment,
          rooms: currentMasters,
          internetTypeId: currentInternetUsage
        };

        await this.repository.mapRecap(mapInput, params.semesterId);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
    console.log(data.length);
    return data.length;

  }

  async unpackRecapData(params: RecapsJSONInput) {
    const mappedData = params.data.map(data => ({
      software: {
        name: data['softwareName'],
        version: data['version'],
        license: data['license'],
        numberOfLicense: parseInt(data['numberOfLicense']),
        currentLicense: data['currentLicense'],
        installerPath: data['installerPath'],
        note: data['note'],
        link: data['link'],
        groupId: data['groupId']
      },
      department: {
        name: data['jurusan']
      },
      course: {
        code: data['kodeMataKuliah'] ? data['kodeMataKuliah'] : ""
      },
      internetUsageType: {
        name: data['intenetNeeded']
      },
      group: {
        name: data['group']
      },
      master: {
        general_black: data['general_black'],
        general_silver: data['general_silver'],
        bahasa: data['bahasa'],
        jaringan: data['jaringan'],
        mulmed: data['mulmed'],
        highspec: data['highspec'],
        mac: data['mac']
      }
    }));

    return mappedData
  }

}