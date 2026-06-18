import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { MatricularDto } from '../dto/matricular.dto';
import { AlunoDisciplinaService } from '../service/aluno-disciplina.service';

@Controller('rest/sistema/matricula')
@UseGuards(JwtAuthGuard)
export class AlunoDisciplinaController {
  constructor(private readonly service: AlunoDisciplinaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('matricular')
  async matricular(
    @Req() req: Request,
    @Body() dto: MatricularDto,
  ): Promise<Result<any>> { 
    const response = await this.service.matricular(dto);

    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Matrícula realizada com sucesso!',
      response,
      req.path,
      null,
      { self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, method: req.method } },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('disciplina/:id')
  async getAlunosPorDisciplina(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<any>> {
    const response = await this.service.getAlunosPorDisciplina(Number(id));

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Alunos matriculados recuperados com sucesso!',
      response,
      req.path,
      null,
      { self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, method: req.method } },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Put('status')
  async alterarStatus(
    @Req() req: Request,
    @Body() body: { alunoId: number, disciplinaId: number, status: string },
  ): Promise<Result<any>> {
    const response = await this.service.alterarStatus(body.alunoId, body.disciplinaId, body.status);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Status alterado com sucesso!',
      response,
      req.path,
      null,
      { self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, method: req.method } },
    );
  }
}
