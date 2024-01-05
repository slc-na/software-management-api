import { Injectable } from "@nestjs/common";
import { Semester } from "@prisma/client";
import { SemestersRepository } from "./semesters.repository";
import { SelectSemesterByIdInput } from "./dto/select-semester-by-id.input";
import { UpdateSemesterInput } from "./dto/update-semester.input";
import { DeleteSemesterInput } from "./dto/delete-semester.input";

@Injectable()
export class SemestersService {
  constructor(private repository: SemestersRepository) {}

  async createSemester(params: { name: Semester['name'], isActive: Semester['isActive'] }) {
    const { name, isActive } = params;
    return await this.repository.createSemester({
      data: {
        name,
        isActive
      }
    });
  }

  async getSemesters() {
    return await this.repository.getSemesters({});
  }

  async getSemesterById(params: SelectSemesterByIdInput) {
    return this.repository.getSemesterById({
      where: params
    });
  }

  async updateSemester(params: UpdateSemesterInput) {
    return this.repository.updateSemester(params);
  }

  async deleteSemester(params: DeleteSemesterInput) {
    return this.repository.deleteSemesterById({
      where: {
        id: params.id
      }
    });
  }
}