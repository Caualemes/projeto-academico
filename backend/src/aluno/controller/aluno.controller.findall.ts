import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Page } from '../../commons/pagination/page.sistema';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindAll } from '../service/aluno.service.findall';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { geraPageLinks } from '../../commons/utils/hateoas.utils';

@Controller(ROTA.ALUNO.BASE)
@UseGuards(JwtAuthGuard)
export class AlunoControllerFindAll {
  constructor(private readonly alunoServiceFindAll: AlunoServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.ALUNO.LIST)
  async findAll(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<AlunoResponse>>> {
    const response = await this.alunoServiceFindAll.findAll(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : 'nomeAluno',
      order ? order : PAGINATION.ASC,
      search,
    );

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de alunos recuperada com sucesso!',
      response,
      req.path,
      null,
      geraPageLinks(req, response, 'aluno'),
    );
  }
}
