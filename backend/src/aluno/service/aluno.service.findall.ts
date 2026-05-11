import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { fieldsAluno, ALUNO } from '../constants/aluno.constants';
import { ConverterAluno } from '../dto/converter/aluno.converter';
import { AlunoResponse } from '../dto/response/aluno.response';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceFindAll {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<AlunoResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsAluno);

    const query = this.alunoRepository
      .createQueryBuilder(ALUNO.ENTITY)
      .leftJoinAndSelect(`${ALUNO.ENTITY}.usuario`, 'usuario')
      .orderBy(`${ALUNO.ENTITY}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.where(`${ALUNO.ENTITY}.${props} LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    const [listaAluno, totalElements] = await query.getManyAndCount();

    const alunos = ConverterAluno.toListAlunoResponse(listaAluno);

    return Page.of(alunos, totalElements, pageable);
  }
}
