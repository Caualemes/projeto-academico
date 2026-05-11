import { ConverterProfessor } from '../../../professor/dto/converter/professor.converter';
import { Disciplina } from '../../entities/disciplina.entity';
import { DisciplinaResponse } from '../response/disciplina.response';
import { ROTA } from '../../../commons/constants/url.sistema';

export class ConverterDisciplina {
  static toDisciplinaResponse(disciplina: Disciplina): DisciplinaResponse {
    const response = new DisciplinaResponse();
    response.idDisciplina = disciplina.idDisciplina;
    response.periodo = disciplina.periodo;
    response.nomeDisciplina = disciplina.nomeDisciplina;
    response.idProfessor = disciplina.idProfessor;

    if (disciplina.professor) {
      response.professor = ConverterProfessor.toProfessorResponse(disciplina.professor);
    }

    // HATEOAS Links
    const baseUrl = ROTA.DISCIPLINA.BASE;
    response._links = {
      self: { href: `${baseUrl}/buscar/${disciplina.idDisciplina}`, method: 'GET' },
      update: { href: `${baseUrl}/alterar/${disciplina.idDisciplina}`, method: 'PUT' },
      delete: { href: `${baseUrl}/excluir/${disciplina.idDisciplina}`, method: 'DELETE' },
    };

    return response;
  }

  static toListDisciplinaResponse(disciplinas: Disciplina[]): DisciplinaResponse[] {
    return disciplinas.map((d) => this.toDisciplinaResponse(d));
  }
}
