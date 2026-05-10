import { Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { ProfessorServiceDelete } from '../service/professor.service.delete';

@Controller(ROTA.PROFESSOR.BASE)
@UseGuards(JwtAuthGuard)
export class ProfessorControllerDelete {
  constructor(private readonly professorServiceDelete: ProfessorServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.PROFESSOR.DELETE)
  async delete(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<boolean>> {
    const response = await this.professorServiceDelete.delete(id);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Professor excluído com sucesso!',
      response,
      req.path,
      null,
      null,
    );
  }
}
