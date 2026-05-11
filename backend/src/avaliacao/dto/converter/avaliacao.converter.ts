import { ConverterDisciplina } from '../../../disciplina/dto/converter/disciplina.converter';
import { Avaliacao } from '../../entities/avaliacao.entity';
import { AvaliacaoResponse } from '../response/avaliacao.response';

export class ConverterAvaliacao {
  static toAvaliacaoResponse(avaliacao: Avaliacao): AvaliacaoResponse {
    const response = new AvaliacaoResponse();
    response.idAvaliacao = avaliacao.idAvaliacao;
    response.descricao = avaliacao.descricao;
    response.disciplinaId = avaliacao.disciplinaId;

    if (avaliacao.disciplina) {
      response.disciplina = ConverterDisciplina.toDisciplinaResponse(avaliacao.disciplina);
    }

    return response;
  }

  static toListAvaliacaoResponse(avaliacoes: Avaliacao[]): AvaliacaoResponse[] {
    return avaliacoes.map((a) => this.toAvaliacaoResponse(a));
  }
}
