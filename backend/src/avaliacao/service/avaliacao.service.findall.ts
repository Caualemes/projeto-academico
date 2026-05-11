import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { fieldsAvaliacao, AVALIACAO } from '../constants/avaliacao.constants';
import { ConverterAvaliacao } from '../dto/converter/avaliacao.converter';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { Avaliacao } from '../entities/avaliacao.entity';

@Injectable()
export class AvaliacaoServiceFindAll {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
    disciplinaId?: number,
  ): Promise<Page<AvaliacaoResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsAvaliacao);

    const query = this.avaliacaoRepository
      .createQueryBuilder(AVALIACAO.ENTITY)
      .leftJoinAndSelect(`${AVALIACAO.ENTITY}.disciplina`, 'disciplina')
      .orderBy(`${AVALIACAO.ENTITY}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.andWhere(`${AVALIACAO.ENTITY}.descricao LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    if (disciplinaId) {
      query.andWhere(`${AVALIACAO.ENTITY}.disciplinaId = :disciplinaId`, {
        disciplinaId,
      });
    }

    const [lista, totalElements] = await query.getManyAndCount();

    const responses = ConverterAvaliacao.toListAvaliacaoResponse(lista);

    return Page.of(responses, totalElements, pageable);
  }
}
