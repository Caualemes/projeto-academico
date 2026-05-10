import { Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { UsuarioServiceDelete } from '../service/usuario.service.delete';

@Controller(ROTA.USUARIO.BASE)
@UseGuards(JwtAuthGuard)
export class UsuarioControllerDelete {
  constructor(private readonly usuarioServiceDelete: UsuarioServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.USUARIO.DELETE)
  async delete(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<boolean>> {
    const response = await this.usuarioServiceDelete.delete(id);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Usuário excluído com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
