import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceDelete {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async delete(idAluno: number): Promise<void> {
    const alunoToDelete = await this.alunoRepository.findOne({
      where: { idAluno },
    });

    if (!alunoToDelete) {
      throw new NotFoundException(`Aluno com id ${idAluno} não encontrado.`);
    }

    await this.alunoRepository.remove(alunoToDelete);
  }
}
