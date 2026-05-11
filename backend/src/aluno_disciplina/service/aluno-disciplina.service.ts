import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlunoDisciplina } from '../entities/aluno-disciplina.entity';
import { MatricularDto } from '../dto/matricular.dto';

@Injectable()
export class AlunoDisciplinaService {
  constructor(
    @InjectRepository(AlunoDisciplina)
    private repo: Repository<AlunoDisciplina>,
  ) {}

  async matricular(dto: MatricularDto): Promise<AlunoDisciplina> {
    const existing = await this.repo.findOne({
      where: { alunoId: dto.alunoId, disciplinaId: dto.disciplinaId }
    });

    if (existing) {
      throw new BadRequestException('Aluno já matriculado nesta disciplina.');
    }

    const matricula = new AlunoDisciplina({ ...dto });
    return this.repo.save(matricula);
  }

  async getAlunosPorDisciplina(disciplinaId: number): Promise<AlunoDisciplina[]> {
    return this.repo.find({
      where: { disciplinaId },
      relations: ['aluno', 'aluno.usuario'],
    });
  }

  async alterarStatus(alunoId: number, disciplinaId: number, status: string): Promise<AlunoDisciplina> {
    const matricula = await this.repo.findOne({
      where: { alunoId, disciplinaId }
    });

    if (!matricula) {
      throw new NotFoundException('Matrícula não encontrada.');
    }

    matricula.status = status;
    return this.repo.save(matricula);
  }
}
