import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from '../entities/disciplina.entity';

@Injectable()
export class DisciplinaServiceDelete {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async delete(id: number): Promise<void> {
    const entity = await this.disciplinaRepository.findOne({
      where: { idDisciplina: id },
    });

    if (!entity) {
      throw new NotFoundException(`Disciplina com id ${id} não encontrada.`);
    }

    await this.disciplinaRepository.remove(entity);
  }
}
