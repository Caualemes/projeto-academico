import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AtualizarProfessorDto } from '../dto/atualizar-professor.dto';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceUpdate } from '../service/professor.service.update';

@Controller(ROTA.PROFESSOR.BASE)
@UseGuards(JwtAuthGuard)
export class ProfessorControllerUpdate {
  constructor(private readonly professorServiceUpdate: ProfessorServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.PROFESSOR.UPDATE)
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarProfessorDto,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorServiceUpdate.update(id, dto);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Professor atualizado com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'professor', response.idProfessor),
    );
  }
}
