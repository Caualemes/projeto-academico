import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { CreateProfessorDto } from '../dto/create-professor.dto';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { ProfessorResponse } from '../dto/response/professor.response';
import { Professor } from '../entities/professor.entity';

@Injectable()
export class ProfessorServiceCreate {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateProfessorDto): Promise<ProfessorResponse> {
    const existingProfessor = await this.professorRepository.findOne({
      where: { codProfessor: dto.codProfessor },
    });

    if (existingProfessor) {
      throw new ConflictException('Já existe um professor com este código');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: dto.idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const professor = new Professor({
      codProfessor: dto.codProfessor,
      nomeProfessor: dto.nomeProfessor,
      idUsuario: dto.idUsuario,
      usuario: usuario,
    });

    const savedProfessor = await this.professorRepository.save(professor);
    return ConverterProfessor.toProfessorResponse(savedProfessor);
  }
}
