import { Professor } from '../../entities/professor.entity';
import { ProfessorResponse } from '../response/professor.response';

export class ConverterProfessor {
  public static toProfessorResponse(professor: Professor): ProfessorResponse {
    const response = new ProfessorResponse();
    response.idProfessor = professor.idProfessor;
    response.codProfessor = professor.codProfessor;
    response.nomeProfessor = professor.nomeProfessor || '';
    response.idUsuario = professor.idUsuario;
    if (professor.usuario) {
      response.usuarioNome = `${professor.usuario.firstName} ${professor.usuario.lastName}`;
    }
    return response;
  }

  public static toListProfessorResponse(professores: Professor[]): ProfessorResponse[] {
    return professores.map((professor) => this.toProfessorResponse(professor));
  }
}
