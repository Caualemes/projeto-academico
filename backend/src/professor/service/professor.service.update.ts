import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { AtualizarProfessorDto } from '../dto/atualizar-professor.dto';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { ProfessorResponse } from '../dto/response/professor.response';
import { Professor } from '../entities/professor.entity';

@Injectable()
export class ProfessorServiceUpdate {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async update(idProfessor: number, dto: AtualizarProfessorDto): Promise<ProfessorResponse> {
    const professor = await this.professorRepository.findOne({
      where: { idProfessor },
      relations: ['usuario'],
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    if (dto.codProfessor !== undefined) professor.codProfessor = dto.codProfessor;
    if (dto.nomeProfessor !== undefined) professor.nomeProfessor = dto.nomeProfessor;
    
    if (dto.idUsuario !== undefined && dto.idUsuario !== professor.idUsuario) {
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario: dto.idUsuario },
      });
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      professor.idUsuario = dto.idUsuario;
      professor.usuario = usuario;
    }

    const updatedProfessor = await this.professorRepository.save(professor);
    return ConverterProfessor.toProfessorResponse(updatedProfessor);
  }
}
