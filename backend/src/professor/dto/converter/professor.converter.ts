import { Professor } from '../../entities/professor.entity';
import { ProfessorResponse } from '../response/professor.response';
import { ROTA } from '../../../commons/constants/url.sistema';

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

    // HATEOAS Links
    const baseUrl = ROTA.PROFESSOR.BASE;
    response._links = {
      self: { href: `${baseUrl}/buscar/${professor.idProfessor}`, method: 'GET' },
      update: { href: `${baseUrl}/alterar/${professor.idProfessor}`, method: 'PUT' },
      delete: { href: `${baseUrl}/excluir/${professor.idProfessor}`, method: 'DELETE' },
    };

    return response;
  }

  public static toListProfessorResponse(professores: Professor[]): ProfessorResponse[] {
    return professores.map((professor) => this.toProfessorResponse(professor));
  }
}
