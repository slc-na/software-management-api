import { Args, Mutation,Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CourseOutlineMessierModel } from "src/modules/messier/dto/course-outline.model";
import { DeleteSoftwareMessierInput } from "src/modules/messier/dto/delete-software.input";
import { GenerateMasterMessierInput } from "src/modules/messier/dto/generate-master.input";
import { MapSoftwareToMasterMessierInput } from "src/modules/messier/dto/map-software-to-master.input";
import { MasterModel } from "src/modules/messier/dto/master.model";
import { ResponseModel } from "src/modules/messier/dto/response.model";
import { RoomModel } from "src/modules/messier/dto/room.model";
import { SaveMultipleMapSoftwareMessierInput } from "src/modules/messier/dto/save-multiple-map-software.input";
import { SaveSoftwareBulkInputMessier } from "src/modules/messier/dto/save-software-bulk.input";
import { SaveSoftwareMessierInput } from "src/modules/messier/dto/save-software.input";
import { SoftwareMessier } from "src/modules/messier/dto/softwareMessier.model";
import { MessierServices } from "src/modules/messier/messier.service";

@Resolver()
export class MessierResolver {
  constructor(private readonly messierService: MessierServices) { }

  @Mutation(() => ResponseModel)
  async saveSoftwareToMessier(@Args('MessierInput') saveSoftwareInput: SaveSoftwareMessierInput) {
    return this.messierService.saveSoftware(saveSoftwareInput)

  }
  @Mutation(() => ResponseModel)
  async deleteSoftwareFromMessier(@Args('MessierInput') deleteSoftwareInput: DeleteSoftwareMessierInput) {
    return this.messierService.deleteSoftware(deleteSoftwareInput)
  }

  @Mutation(()=>ResponseModel)
  async saveSoftwareBulk(@Args('MessierInput') saveSoftwareBulkInputMessier: SaveSoftwareBulkInputMessier) {
    return this.messierService.saveSoftwareBulk(saveSoftwareBulkInputMessier)
  }

  @Mutation(()=>ResponseModel)
  async generateMasterRoom(@Args('MessierInput') generateMasterMessierInput: GenerateMasterMessierInput) {
    return this.messierService.generateMasterRoom(generateMasterMessierInput)
  }

  @Mutation(()=>ResponseModel)
  async saveMultipleMapSoftware(@Args('MessierInput') saveMultipleMapSoftwareMessierInput: SaveMultipleMapSoftwareMessierInput) {
    return this.messierService.saveMultipleMapSoftare(saveMultipleMapSoftwareMessierInput)
  }

  @Mutation(()=>ResponseModel)
  async mapSoftwareToMasters(@Args('MessierInput') mapSoftwareToMasterMessierInput: MapSoftwareToMasterMessierInput) {
    return this.messierService.mapSoftwareToMaster(mapSoftwareToMasterMessierInput)
  }

  @Query(()=>[RoomModel])
  async getRoomsMessier() {
     return this.messierService.getRooms()
  }

  @Query(()=>[MasterModel])
  async getMasterMessier(@Args('MessierInput') params: string) {
     return this.messierService.getMaster(params)
  }

  @Query(()=>[SoftwareMessier])
  async getSoftwareBySemesterMessier(@Args('MessierInput') params:string){
    return this.messierService.getSoftwareBySemester(params)
  }

  @Query(()=>[CourseOutlineMessierModel])
  async getCourseOutlineWithDepartments(@Args('MessierInput') params:string){
    return this.messierService.getCourseOutlineWithDepartments(params)
  }
    
}