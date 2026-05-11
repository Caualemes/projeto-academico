import { Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindById } from '../service/aluno.service.findbyid';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { gerarLinks } from '../../commons/utils/hateoas.utils';

@Controller(ROTA.ALUNO.BASE)
@UseGuards(JwtAuthGuard)
export class AlunoControllerFindById {
  constructor(private readonly alunoServiceFindById: AlunoServiceFindById) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.ALUNO.BY_ID)
  async findById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoServiceFindById.findById(id);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Aluno recuperado com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'aluno', id),
    );
  }
}
