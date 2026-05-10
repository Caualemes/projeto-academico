import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceDelete {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async delete(idUsuario: number): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      await this.usuarioRepository.remove(usuario);
      return true;
    } catch (error: any) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.number === 1451) {
        throw new ConflictException(
          'Este usuário não pode ser excluído pois está vinculado a outros registros no sistema (como um aluno ou professor).',
        );
      }
      throw error;
    }
  }
}
