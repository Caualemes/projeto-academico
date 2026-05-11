import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterAvaliacao } from '../dto/converter/avaliacao.converter';
import { AtualizarAvaliacaoDto } from '../dto/atualizar-avaliacao.dto';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { Avaliacao } from '../entities/avaliacao.entity';

@Injectable()
export class AvaliacaoServiceUpdate {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async update(id: number, dto: AtualizarAvaliacaoDto): Promise<AvaliacaoResponse> {
    const entity = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: id },
      relations: ['disciplina'],
    });

    if (!entity) {
      throw new NotFoundException(`Avaliação com id ${id} não encontrada.`);
    }

    Object.assign(entity, dto);
    const updated = await this.avaliacaoRepository.save(entity);

    const updatedWithRel = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: updated.idAvaliacao },
      relations: ['disciplina'],
    });

    return ConverterAvaliacao.toAvaliacaoResponse(updatedWithRel!);
  }
}
