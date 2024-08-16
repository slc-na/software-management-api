import { Injectable } from "@nestjs/common";
import { MessierRepository } from "./messier.repository";
import { SaveSoftwareMessierInput } from "./dto/save-software.input";
import axios from "axios";
import { DeleteSoftwareMessierInput } from "./dto/delete-software.input";
import { SaveSoftwareBulkInputMessier } from "./dto/save-software-bulk.input";
import { GenerateMasterMessierInput } from "./dto/generate-master.input";
import { SaveMultipleMapSoftwareMessierInput } from "./dto/save-multiple-map-software.input";
import { MapSoftwareToMasterMessierInput } from "./dto/map-software-to-master.input";

@Injectable()
export class MessierServices {

  constructor(
    private repository: MessierRepository,
  ) { }

  // async test(params: MessierInput) {
  //   return { text: 'params' }
  // }
  
  async saveSoftware(params : SaveSoftwareMessierInput){
      const BASEURL : string = 'http://bluejack.slc.net/lapi/api/'
      const SOFTWARE = {
        SemesterId: params.SemesterId,
        Name: params.Name,
        Version: params.Version,
        License: params.License,
        CurrentLicense: params.CurrentLicense,
        NumberOfLicense: params.NumberOfLicense,
        Group: params.Group,
        Link: params.Link,
        Note: params.Note,
        InstallerPath: params.InstallerPath,
      }

      const res = await axios.post(`${BASEURL}Software/SaveSoftware`, SOFTWARE)
      return {response : res.statusText,code : res.status}
      
  }

  async deleteSoftware(params: DeleteSoftwareMessierInput){
    const BASEURL : string = 'http://bluejack.slc.net/lapi/api/'
    const SOFTWARE = {
      SoftwareID : params.SoftwareID,
      Reason : params.Reason
    }
    const res = await axios.post(`${BASEURL}Software/DeleteSoftware`, SOFTWARE)
    return {response : res.statusText,code : res.status}
  }

  async saveSoftwareBulk(params : SaveSoftwareBulkInputMessier){
    const BASEURL : string = 'http://bluejack.slc.net/lapi/api/'
    const SOFTWARES = {
      SemesterId: params.SemesterId,
      SoftwareList: params.SoftwareList
    }

    const res = await axios.post(`${BASEURL}Software/SaveSoftwareBulk`, SOFTWARES)
    return {response : res.statusText,code : res.status}
  }

  async generateMasterRoom(params : GenerateMasterMessierInput){
    const BASEURL : string = 'http://bluejack.slc.net/lapi/api/'
    const SEMESTER = {
      Key : params.Key,
      Value: params.Value,
      Description : params.Description
    }

    const res = await axios.post(`${BASEURL}Room/GenerateMasterRoom`, SEMESTER)
    return {response : res.statusText,code : res.status}

  }

  async saveMultipleMapSoftare(params : SaveMultipleMapSoftwareMessierInput){
    const BASEURL : string = 'http://bluejack.slc.net/lapi/api/'
    const SOFTWAREIDS = {
      SemesterId : params.SemesterId,
      SoftwareIds : params.SoftwareIDs,
      Room : params.Room
    }

    const res = await axios.post(`${BASEURL}Room/SaveMultipleMapSoftwareToMaster`, SOFTWAREIDS)
    return {response : res.statusText,code : res.status}
  }

  async mapSoftwareToMaster(params : MapSoftwareToMasterMessierInput){
    const BASEURL : string = 'http://bluejack.slc.net/lapi/api/'
    const MASTERIDS = {
      SemesterId : params.SemesterId,
      SoftwareIds : params.SoftwareIDs,
      MasterIds : params.MasterIds
    }

    const res = await axios.post(`${BASEURL}Room/MapSoftwareToMasters`, MASTERIDS)
    
    return {response : res.statusText,code : res.status}
  }

  async getRooms(){
    const BASEURL: string = 'http://bluejack.slc.net/lapi/api/';

    const res = await axios.get(`${BASEURL}Room/GetRooms`);
    const data = res.data.map(data => ({
        campus: data['Campus'],
        capacity: data['Capacity'],
        name: data['Name'],
        note: data['Note'],
        roomId: data['RoomId'],
    }));

    return data;
  }

  async getMaster(params : string){
    
    const BASEURL: string = 'http://bluejack.slc.net/lapi/api/';

    const res = await axios.get(`${BASEURL}Room/GetMasters?SemesterId=${params}`);
    const data = res.data.map(data => ({
        description : data["Description"],
        insertDate : data["InsertDate"],
        masterId : data["Master"]["MasterId"],
        name : data["Master"]["Name"],
        semesterId : data["Master"]["SemesterId"],
        PIC : data["PIC"],
    }));
    
    return data;
  }

  async getSoftwareBySemester(params : string){
    const BASEURL: string = 'http://bluejack.slc.net/lapi/api/';

    const res = await axios.get(`${BASEURL}Software/GetSoftwareBySemester?semesterId=${params}`);
    const data = res.data.map(data => ({
        name : data["Name"],
        semesterId : data["SemesterId"],
        softwareId : data["SoftwareId"],
        version : data["Version"],
    }));
    console.log(data);
    
    return data; 
  }

  async getCourseOutlineWithDepartments(params : string){
    const BASEURL: string = 'http://bluejack.slc.net/lapi/api/';

    const res = await axios.get(`${BASEURL}Software/GetCourseOutlineWithDepartments?semesterId=${params}`);
    const data = res.data.map(data => ({
        courseOutlineId : data["CourseOutlineId"],
        departments : data['Departments'],
        name : data["Name"],
        software : {
            name: data['Software']['Name'],
            semesterId: data['Software']['SemesterId'],
            softwareId: data['Software']['SoftwareId'],
            version: data['Software']['Version']
        },
    }));
    console.log(data);
    return data; 
  }
 
}