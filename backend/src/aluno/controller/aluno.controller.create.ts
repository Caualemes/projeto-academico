import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceCreate } from '../service/aluno.service.create';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';

@Controller(ROTA.ALUNO.BASE)
@UseGuards(JwtAuthGuard)
export class AlunoControllerCreate {
  constructor(private readonly alunoServiceCreate: AlunoServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.ALUNO.CREATE)
  async create(
    @Req() req: Request,
    @Body() dto: CreateAlunoDto,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoServiceCreate.create(dto);

    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Aluno criado com sucesso!',
      response,
      req.path,
      null,
      gerarLinks(req, 'aluno', response.idAluno),
    );
  }
}
