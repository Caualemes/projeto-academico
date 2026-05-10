import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindById } from '../service/professor.service.findbyid';

@Controller(ROTA.PROFESSOR.BASE)
@UseGuards(JwtAuthGuard)
export class ProfessorControllerFindById {
  constructor(private readonly professorServiceFindById: ProfessorServiceFindById) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.PROFESSOR.BY_ID)
  async findById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorServiceFindById.findById(id);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Professor recuperado com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
