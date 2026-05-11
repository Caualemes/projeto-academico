import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from '../entities/avaliacao.entity';

@Injectable()
export class AvaliacaoServiceDelete {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async delete(id: number): Promise<void> {
    const entity = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: id },
    });

    if (!entity) {
      throw new NotFoundException(`Avaliação com id ${id} não encontrada.`);
    }

    await this.avaliacaoRepository.remove(entity);
  }
}
