import type { Professor } from "../../professor/type/Professor";

export interface Disciplina {
  idDisciplina?: number;
  nomeDisciplina: string;
  periodo: number;
  idProfessor: number;
  professor?: Professor;
}
