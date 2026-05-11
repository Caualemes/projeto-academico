import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterAvaliacao } from '../dto/converter/avaliacao.converter';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { Avaliacao } from '../entities/avaliacao.entity';

@Injectable()
export class AvaliacaoServiceFindById {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async findById(id: number): Promise<AvaliacaoResponse> {
    const entity = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: id },
      relations: ['disciplina'],
    });

    if (!entity) {
      throw new NotFoundException(`Avaliação com id ${id} não encontrada.`);
    }

    return ConverterAvaliacao.toAvaliacaoResponse(entity);
  }
}
