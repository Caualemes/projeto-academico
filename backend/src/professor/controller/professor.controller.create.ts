import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { CreateProfessorDto } from '../dto/create-professor.dto';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceCreate } from '../service/professor.service.create';

@Controller(ROTA.PROFESSOR.BASE)
@UseGuards(JwtAuthGuard)
export class ProfessorControllerCreate {
  constructor(private readonly professorServiceCreate: ProfessorServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.PROFESSOR.CREATE)
  async create(
    @Req() req: Request,
    @Body() dto: CreateProfessorDto,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorServiceCreate.create(dto);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Professor cadastrado com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'professor', response.idProfessor),
    );
  }
}
