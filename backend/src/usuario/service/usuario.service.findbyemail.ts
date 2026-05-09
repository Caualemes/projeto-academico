import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceFindByEmail {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
    });
  }

  async save(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async findByRecoveryToken(token: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { recoveryToken: token }
    });
  }
}
