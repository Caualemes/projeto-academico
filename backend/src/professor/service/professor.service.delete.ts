import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';

@Injectable()
export class ProfessorServiceDelete {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async delete(idProfessor: number): Promise<boolean> {
    const professor = await this.professorRepository.findOne({
      where: { idProfessor },
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    try {
      await this.professorRepository.remove(professor);
      return true;
    } catch (error: any) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.number === 1451) {
        throw new ConflictException(
          'Este professor não pode ser excluído pois está vinculado a outros registros no sistema.',
        );
      }
      throw error;
    }
  }
}
