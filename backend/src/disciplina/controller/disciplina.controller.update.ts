import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { AtualizarDisciplinaDto } from '../dto/atualizar-disciplina.dto';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceUpdate } from '../service/disciplina.service.update';

@Controller(ROTA.DISCIPLINA.BASE)
@UseGuards(JwtAuthGuard)
export class DisciplinaControllerUpdate {
  constructor(private readonly service: DisciplinaServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.DISCIPLINA.UPDATE)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: AtualizarDisciplinaDto,
  ): Promise<Result<DisciplinaResponse>> {
    const response = await this.service.update(Number(id), dto);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina atualizada com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
