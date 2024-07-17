import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RecapsJSONInput } from "./messier.model";
import { MessierRepository } from "./messier.repository";
import { MessierInput } from "./dto/messier.input";
import { SaveSoftwareMessierInput } from "./dto/save-software.input";
import axios from "axios";
import { DeleteSoftwareMessierInput } from "./dto/delete-software.input";

@Injectable()
export class MessierServices {

  constructor(
    private repository: MessierRepository,
  ) { }

  async test(params: MessierInput) {
    return { text: 'params' }
  }
  
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

}