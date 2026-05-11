import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceFindById {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async findById(id: number): Promise<DisciplinaResponse> {
    const entity = await this.disciplinaRepository.findOne({
      where: { idDisciplina: id },
      relations: ['professor'],
    });

    if (!entity) {
      throw new NotFoundException(`Disciplina com id ${id} não encontrada.`);
    }

    return ConverterDisciplina.toDisciplinaResponse(entity);
  }
}
