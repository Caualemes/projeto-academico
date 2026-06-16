import { Controller, Delete, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { DisciplinaServiceDelete } from '../service/disciplina.service.delete';

@Controller(ROTA.DISCIPLINA.BASE)
@UseGuards(JwtAuthGuard)
export class DisciplinaControllerDelete {
  constructor(private readonly service: DisciplinaServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.DISCIPLINA.DELETE)
  async delete(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<null>> {
    await this.service.delete(Number(id));

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina excluída com sucesso!',
      null,
      req.path,
      null,
      gerarLinks(req, 'disciplina'),
    );
  }
}
