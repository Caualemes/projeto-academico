import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { AtualizarDisciplinaDto } from '../dto/atualizar-disciplina.dto';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceUpdate {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async update(id: number, dto: AtualizarDisciplinaDto): Promise<DisciplinaResponse> {
    const entity = await this.disciplinaRepository.findOne({
      where: { idDisciplina: id },
      relations: ['professor'],
    });

    if (!entity) {
      throw new NotFoundException(`Disciplina com id ${id} não encontrada.`);
    }

    Object.assign(entity, dto);
    const updated = await this.disciplinaRepository.save(entity);

    const updatedWithProf = await this.disciplinaRepository.findOne({
      where: { idDisciplina: updated.idDisciplina },
      relations: ['professor'],
    });

    return ConverterDisciplina.toDisciplinaResponse(updatedWithProf!);
  }
}
