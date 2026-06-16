import { Controller, Delete, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AvaliacaoServiceDelete } from '../service/avaliacao.service.delete';

@Controller(ROTA.AVALIACAO.BASE)
@UseGuards(JwtAuthGuard)
export class AvaliacaoControllerDelete {
  constructor(private readonly service: AvaliacaoServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.AVALIACAO.DELETE)
  async delete(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<null>> {
    await this.service.delete(Number(id));

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Avaliação excluída com sucesso!',
      null,
      req.path,
      null,
      gerarLinks(req, 'avaliacao'),
    );
  }
}
