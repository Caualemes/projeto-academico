import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterAvaliacao } from '../dto/converter/avaliacao.converter';
import { CreateAvaliacaoDto } from '../dto/create-avaliacao.dto';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { Avaliacao } from '../entities/avaliacao.entity';

@Injectable()
export class AvaliacaoServiceCreate {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async create(dto: CreateAvaliacaoDto): Promise<AvaliacaoResponse> {
    const data = new Avaliacao({ ...dto });
    const saved = await this.avaliacaoRepository.save(data);

    const savedWithRel = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: saved.idAvaliacao },
      relations: ['disciplina'],
    });

    return ConverterAvaliacao.toAvaliacaoResponse(savedWithRel!);
  }
}
