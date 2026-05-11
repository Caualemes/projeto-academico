import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterAluno } from '../dto/converter/aluno.converter';
import { AtualizarAlunoDto } from '../dto/atualizar-aluno.dto';
import { AlunoResponse } from '../dto/response/aluno.response';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceUpdate {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async update(
    idAluno: number,
    updateAlunoDto: AtualizarAlunoDto,
  ): Promise<AlunoResponse> {
    const alunoToUpdate = await this.alunoRepository.findOne({
      where: { idAluno },
      relations: ['usuario'],
    });

    if (!alunoToUpdate) {
      throw new NotFoundException(`Aluno com id ${idAluno} não encontrado.`);
    }

    Object.assign(alunoToUpdate, updateAlunoDto);

    const updatedAluno = await this.alunoRepository.save(alunoToUpdate);

    const updatedWithUser = await this.alunoRepository.findOne({
      where: { idAluno: updatedAluno.idAluno },
      relations: ['usuario'],
    });

    return ConverterAluno.toAlunoResponse(updatedWithUser!);
  }
}
