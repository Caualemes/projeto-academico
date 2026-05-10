import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { ProfessorResponse } from '../dto/response/professor.response';
import { Professor } from '../entities/professor.entity';

@Injectable()
export class ProfessorServiceFindById {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async findById(idProfessor: number): Promise<ProfessorResponse> {
    const professor = await this.professorRepository.findOne({
      where: { idProfessor },
      relations: ['usuario'],
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    return ConverterProfessor.toProfessorResponse(professor);
  }
}
