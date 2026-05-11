import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Page } from '../../commons/pagination/page.sistema';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceFindAll } from '../service/disciplina.service.findall';
import { geraPageLinks } from '../../commons/utils/hateoas.utils';

@Controller(ROTA.DISCIPLINA.BASE)
@UseGuards(JwtAuthGuard)
export class DisciplinaControllerFindAll {
  constructor(private readonly service: DisciplinaServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.DISCIPLINA.LIST)
  async findAll(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<DisciplinaResponse>>> {
    const response = await this.service.findAll(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : 'nomeDisciplina',
      order ? order : PAGINATION.ASC,
      search,
    );

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de disciplinas gerada com sucesso!',
      response,
      req.path,
      null,
      geraPageLinks(req, response, 'disciplina'),
    );
  }
}
