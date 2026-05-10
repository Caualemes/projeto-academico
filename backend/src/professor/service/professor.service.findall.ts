import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { fieldsProfessor, PROFESSOR } from '../constants/professor.constants';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { ProfessorResponse } from '../dto/response/professor.response';
import { Professor } from '../entities/professor.entity';

@Injectable()
export class ProfessorServiceFindAll {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<ProfessorResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsProfessor);

    const query = this.professorRepository
      .createQueryBuilder(PROFESSOR.ENTITY)
      .leftJoinAndSelect(`${PROFESSOR.ENTITY}.usuario`, 'usuario')
      .orderBy(`${PROFESSOR.ENTITY}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.where(`${PROFESSOR.ENTITY}.${props} LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    const [listaProfessor, totalElements] = await query.getManyAndCount();

    const professores = ConverterProfessor.toListProfessorResponse(listaProfessor);

    return Page.of(professores, totalElements, pageable);
  }
}
