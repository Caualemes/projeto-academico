import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { Page } from '../../commons/pagination/page.sistema';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindAll } from '../service/professor.service.findall';
import { geraPageLinks } from '../../commons/utils/hateoas.utils';

@Controller(ROTA.PROFESSOR.BASE)
@UseGuards(JwtAuthGuard)
export class ProfessorControllerFindAll {
  constructor(private readonly professorServiceFindAll: ProfessorServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.PROFESSOR.LIST)
  async findAll(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<ProfessorResponse>>> {
    const response = await this.professorServiceFindAll.findAll(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : 'nomeProfessor',
      order ? order : PAGINATION.ASC,
      search,
    );
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de professores gerada com sucesso!',
      response,
      req.path,
      null,
      geraPageLinks(req, response, 'professor'),
    );
  }
}
