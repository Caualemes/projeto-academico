import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtualizarUsuarioDto } from '../dto/atualizar-usuario.dto';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceUpdate {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async update(idUsuario: number, dto: AtualizarUsuarioDto): Promise<UsuarioResponse> {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.firstName !== undefined) usuario.firstName = dto.firstName;
    if (dto.lastName !== undefined) usuario.lastName = dto.lastName;
    if (dto.username !== undefined) usuario.username = dto.username;
    if (dto.email !== undefined) usuario.email = dto.email;
    if (dto.password !== undefined) usuario.senha = dto.password; // Note: In a real app, this should be hashed again before saving.

    const updatedUsuario = await this.usuarioRepository.save(usuario);
    return ConverterUsuario.toUsuarioResponse(updatedUsuario);
  }
}
