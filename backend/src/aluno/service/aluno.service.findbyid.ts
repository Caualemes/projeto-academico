import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterAluno } from '../dto/converter/aluno.converter';
import { AlunoResponse } from '../dto/response/aluno.response';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceFindById {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async findById(idAluno: number): Promise<AlunoResponse> {
    const aluno = await this.alunoRepository.findOne({
      where: { idAluno },
      relations: ['usuario'],
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno com id ${idAluno} não encontrado.`);
    }

    return ConverterAluno.toAlunoResponse(aluno);
  }
}
