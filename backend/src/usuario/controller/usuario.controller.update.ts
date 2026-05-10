import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { AtualizarUsuarioDto } from '../dto/atualizar-usuario.dto';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceUpdate } from '../service/usuario.service.update';

@Controller(ROTA.USUARIO.BASE)
@UseGuards(JwtAuthGuard)
export class UsuarioControllerUpdate {
  constructor(private readonly usuarioServiceUpdate: UsuarioServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.USUARIO.UPDATE)
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarUsuarioDto,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioServiceUpdate.update(id, dto);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Usuário atualizado com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
