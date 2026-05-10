import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceFindById {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findById(idUsuario: number): Promise<UsuarioResponse> {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return ConverterUsuario.toUsuarioResponse(usuario);
  }
}
