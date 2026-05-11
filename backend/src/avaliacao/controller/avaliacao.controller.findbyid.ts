import { Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceFindById } from '../service/avaliacao.service.findbyid';

@Controller(ROTA.AVALIACAO.BASE)
@UseGuards(JwtAuthGuard)
export class AvaliacaoControllerFindById {
  constructor(private readonly service: AvaliacaoServiceFindById) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.AVALIACAO.BY_ID)
  async findById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<AvaliacaoResponse>> {
    const response = await this.service.findById(Number(id));

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Avaliação recuperada com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
