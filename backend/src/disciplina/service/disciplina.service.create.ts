import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { CreateDisciplinaDto } from '../dto/create-disciplina.dto';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceCreate {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async create(dto: CreateDisciplinaDto): Promise<DisciplinaResponse> {
    const data = new Disciplina({ ...dto });
    const saved = await this.disciplinaRepository.save(data);

    const savedWithProf = await this.disciplinaRepository.findOne({
      where: { idDisciplina: saved.idDisciplina },
      relations: ['professor'],
    });

    return ConverterDisciplina.toDisciplinaResponse(savedWithProf!);
  }
}
