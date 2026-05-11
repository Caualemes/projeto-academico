import { Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceFindById } from '../service/disciplina.service.findbyid';
import { gerarLinks } from '../../commons/utils/hateoas.utils';

@Controller(ROTA.DISCIPLINA.BASE)
@UseGuards(JwtAuthGuard)
export class DisciplinaControllerFindById {
  constructor(private readonly service: DisciplinaServiceFindById) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.DISCIPLINA.BY_ID)
  async findById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<DisciplinaResponse>> {
    const response = await this.service.findById(Number(id));

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina recuperada com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'disciplina', Number(id)),
    );
  }
}
