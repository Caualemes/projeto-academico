import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceCreate } from '../service/usuario.service.create';

@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {
  constructor(private readonly usuarioServiceCreate: UsuarioServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.USUARIO.CREATE)
  async create(
    @Req() req: Request,
    @Body() dto: CreateUsuarioDto,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioServiceCreate.create(dto);

    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Usuário criado com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'usuario', response.idUsuario),
    );
  }
}
