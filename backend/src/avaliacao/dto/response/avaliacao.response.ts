import { DisciplinaResponse } from '../../../disciplina/dto/response/disciplina.response';

export class AvaliacaoResponse {
  idAvaliacao?: number;
  descricao?: string;
  disciplinaId!: number;
  disciplina?: DisciplinaResponse;
}
