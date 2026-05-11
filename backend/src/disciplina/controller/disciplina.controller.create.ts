import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { CreateDisciplinaDto } from '../dto/create-disciplina.dto';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceCreate } from '../service/disciplina.service.create';

@Controller(ROTA.DISCIPLINA.BASE)
@UseGuards(JwtAuthGuard)
export class DisciplinaControllerCreate {
  constructor(private readonly service: DisciplinaServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.DISCIPLINA.CREATE)
  async create(
    @Req() req: Request,
    @Body() dto: CreateDisciplinaDto,
  ): Promise<Result<DisciplinaResponse>> {
    const response = await this.service.create(dto);

    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Disciplina criada com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
