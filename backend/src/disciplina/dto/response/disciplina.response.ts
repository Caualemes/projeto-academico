import { ProfessorResponse } from '../../../professor/dto/response/professor.response';
import { BaseResponse } from '../../../commons/dto/base.response';

export class DisciplinaResponse extends BaseResponse {
  idDisciplina?: number;
  periodo!: number;
  nomeDisciplina?: string;
  idProfessor?: number;
  professor?: ProfessorResponse;
}
