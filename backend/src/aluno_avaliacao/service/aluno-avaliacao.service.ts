import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlunoAvaliacao } from '../entities/aluno-avaliacao.entity';
import { LancarNotaDto } from '../dto/lancar-nota.dto';

@Injectable()
export class AlunoAvaliacaoService {
  constructor(
    @InjectRepository(AlunoAvaliacao)
    private repo: Repository<AlunoAvaliacao>,
  ) {}

  async lancarNota(dto: LancarNotaDto): Promise<AlunoAvaliacao> {
    let notaRegistro = await this.repo.findOne({
      where: { alunoId: dto.alunoId, avaliacaoId: dto.avaliacaoId }
    });

    if (notaRegistro) {
      notaRegistro.nota = dto.nota;
    } else {
      notaRegistro = new AlunoAvaliacao({ ...dto });
    }

    return this.repo.save(notaRegistro);
  }

  async getNotasPorAvaliacao(avaliacaoId: number): Promise<AlunoAvaliacao[]> {
    return this.repo.find({
      where: { avaliacaoId },
      relations: ['aluno', 'aluno.usuario'],
    });
  }
}
