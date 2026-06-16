import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { geraPageLinks } from '../../commons/utils/hateoas.utils';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Page } from '../../commons/pagination/page.sistema';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceFindAll } from '../service/avaliacao.service.findall';

@Controller(ROTA.AVALIACAO.BASE)
@UseGuards(JwtAuthGuard)
export class AvaliacaoControllerFindAll {
  constructor(private readonly service: AvaliacaoServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.AVALIACAO.LIST)
  async findAll(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
    @Query('disciplinaId') disciplinaId?: string,
  ): Promise<Result<Page<AvaliacaoResponse>>> {
    const response = await this.service.findAll(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : 'descricao',
      order ? order : PAGINATION.ASC,
      search,
      disciplinaId ? Number(disciplinaId) : undefined,
    );

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de avaliações gerada com sucesso!',
      response,
      req.path,
      null,
      geraPageLinks(req, response, 'avaliacao'),
    );
  }
}
