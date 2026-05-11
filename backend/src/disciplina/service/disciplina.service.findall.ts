import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { fieldsDisciplina, DISCIPLINA } from '../constants/disciplina.constants';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceFindAll {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<DisciplinaResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsDisciplina);

    const query = this.disciplinaRepository
      .createQueryBuilder(DISCIPLINA.ENTITY)
      .leftJoinAndSelect(`${DISCIPLINA.ENTITY}.professor`, 'professor')
      .leftJoinAndSelect('professor.usuario', 'usuario')
      .orderBy(`${DISCIPLINA.ENTITY}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.where(`${DISCIPLINA.ENTITY}.nomeDisciplina LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    const [lista, totalElements] = await query.getManyAndCount();

    const responses = ConverterDisciplina.toListDisciplinaResponse(lista);

    return Page.of(responses, totalElements, pageable);
  }
}
