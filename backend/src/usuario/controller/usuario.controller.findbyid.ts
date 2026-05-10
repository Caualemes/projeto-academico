import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindById } from '../service/usuario.service.findbyid';

@Controller(ROTA.USUARIO.BASE)
@UseGuards(JwtAuthGuard)
export class UsuarioControllerFindById {
  constructor(private readonly usuarioServiceFindById: UsuarioServiceFindById) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.USUARIO.BY_ID)
  async findById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioServiceFindById.findById(id);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Usuário recuperado com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
