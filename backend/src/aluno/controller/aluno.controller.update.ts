import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AtualizarAlunoDto } from '../dto/atualizar-aluno.dto';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceUpdate } from '../service/aluno.service.update';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';

@Controller(ROTA.ALUNO.BASE)
@UseGuards(JwtAuthGuard)
export class AlunoControllerUpdate {
  constructor(private readonly alunoServiceUpdate: AlunoServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.ALUNO.UPDATE)
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() dto: AtualizarAlunoDto,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoServiceUpdate.update(id, dto);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Aluno atualizado com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'aluno', response.idAluno),
    );
  }
}
