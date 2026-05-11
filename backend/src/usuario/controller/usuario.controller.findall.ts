import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { Page } from '../../commons/pagination/page.sistema';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindAll } from '../service/usuario.service.findall';
import { geraPageLinks } from '../../commons/utils/hateoas.utils';

@Controller(ROTA.USUARIO.BASE)
@UseGuards(JwtAuthGuard)
export class UsuarioControllerFindAll {
  constructor(private readonly usuarioServiceFindAll: UsuarioServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.USUARIO.LIST)
  async findAll(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<UsuarioResponse>>> {
    const response = await this.usuarioServiceFindAll.findAll(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : 'firstName',
      order ? order : PAGINATION.ASC,
      search,
    );
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de usuários gerada com sucesso!',
      response,
      req.path,
      null,
      geraPageLinks(req, response, 'usuario'),
    );
  }
}
