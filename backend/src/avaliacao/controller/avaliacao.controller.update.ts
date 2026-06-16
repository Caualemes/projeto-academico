import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AtualizarAvaliacaoDto } from '../dto/atualizar-avaliacao.dto';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceUpdate } from '../service/avaliacao.service.update';

@Controller(ROTA.AVALIACAO.BASE)
@UseGuards(JwtAuthGuard)
export class AvaliacaoControllerUpdate {
  constructor(private readonly service: AvaliacaoServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.AVALIACAO.UPDATE)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: AtualizarAvaliacaoDto,
  ): Promise<Result<AvaliacaoResponse>> {
    const response = await this.service.update(Number(id), dto);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Avaliação atualizada com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'avaliacao', response.idAvaliacao),
    );
  }
}
