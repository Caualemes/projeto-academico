import { plainToInstance } from 'class-transformer';
import { Cidade } from 'src/cidade/entity/cidade.entity';
import { CidadeRequest } from '../request/cidade.request';
import { CidadeResponse } from '../response/cidade.response';
import { ROTA } from '../../../commons/constants/url.sistema';

export class ConverterCidade {
  static toCidade(cidadeRequest: CidadeRequest) {
    const cidade = new Cidade();

    if (cidadeRequest.idCidade != null) {
      cidade.idCidade = cidadeRequest.idCidade;
    }
    cidade.nomeCidade = cidadeRequest.nomeCidade;
    cidade.codCidade = cidadeRequest.codCidade;

    return cidade;
  }

  static toCidadeResponse(cidade: Cidade): CidadeResponse {
    const response = plainToInstance(CidadeResponse, cidade, {
      excludeExtraneousValues: true,
    });

    const baseUrl = ROTA.CIDADE.BASE;
    response._links = {
      self: { href: `${baseUrl}/buscar/${cidade.idCidade}`, method: 'GET' },
      update: { href: `${baseUrl}/alterar/${cidade.idCidade}`, method: 'PUT' },
      delete: { href: `${baseUrl}/excluir/${cidade.idCidade}`, method: 'DELETE' },
    };

    return response;
  }

  static toListCidadeResponse(cidades: Cidade[] = []): CidadeResponse[] {
    return cidades.map((c) => this.toCidadeResponse(c));
  }
}
