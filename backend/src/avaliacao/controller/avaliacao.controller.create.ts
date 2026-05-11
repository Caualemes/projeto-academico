import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { CreateAvaliacaoDto } from '../dto/create-avaliacao.dto';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceCreate } from '../service/avaliacao.service.create';

@Controller(ROTA.AVALIACAO.BASE)
@UseGuards(JwtAuthGuard)
export class AvaliacaoControllerCreate {
  constructor(private readonly service: AvaliacaoServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.AVALIACAO.CREATE)
  async create(
    @Req() req: Request,
    @Body() dto: CreateAvaliacaoDto,
  ): Promise<Result<AvaliacaoResponse>> {
    const response = await this.service.create(dto);

    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Avaliação criada com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
