import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { CreateSemesterInput } from "src/modules/semesters/dto/create-semester.input";
import { DeleteSemesterInput } from "src/modules/semesters/dto/delete-semester.input";
import { SelectSemesterByIdInput } from "src/modules/semesters/dto/select-semester-by-id.input";
import { SelectSemesterInput } from "src/modules/semesters/dto/select.semester.input";
import { UpdateSemesterInput } from "src/modules/semesters/dto/update-semester.input";
import { Semester } from "src/modules/semesters/semesters.model";
import { SemestersService } from "src/modules/semesters/semesters.service";

@Resolver()
export class SemestersResolver {
  constructor(private readonly semestersService: SemestersService) {}

  @Query(() => [Semester])
  async getSemesters() {
    return this.semestersService.getSemesters();
  }

  @Query(() => Semester)
  async getSemesterById(@Args('selectSemesterByIdInput') selectSemesterByIdInput: SelectSemesterByIdInput) {
    return this.semestersService.getSemesterById(selectSemesterByIdInput);
  }

  @Mutation(() => Semester)
  async createSemester(@Args('createSemesterInput') createSemesterInput: CreateSemesterInput) {
    return this.semestersService.createSemester(createSemesterInput);
  }

  @Mutation(() => Semester)
  async updateSemester(@Args('updateSemesterInput') updateSemesterInput: UpdateSemesterInput) {
    return this.semestersService.updateSemester(updateSemesterInput);
  }

  @Mutation(() => Semester)
  async deleteSemester(@Args('deleteSemesterInput') deleteSemesterInput: DeleteSemesterInput) {
    return this.semestersService.deleteSemester(deleteSemesterInput);
  }
}