import { Controller, Delete, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { AlunoServiceDelete } from '../service/aluno.service.delete';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';

@Controller(ROTA.ALUNO.BASE)
@UseGuards(JwtAuthGuard)
export class AlunoControllerDelete {
  constructor(private readonly alunoServiceDelete: AlunoServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.ALUNO.DELETE)
  async delete(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Result<null>> {
    await this.alunoServiceDelete.delete(id);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Aluno excluído com sucesso!',
      null,
      req.path,
      null,
      null,
    );
  }
}
