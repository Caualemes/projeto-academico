import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/config/guards/jwt-auth.guard';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { LancarNotaDto } from '../dto/lancar-nota.dto';
import { AlunoAvaliacaoService } from '../service/aluno-avaliacao.service';

@Controller('rest/sistema/notas')
@UseGuards(JwtAuthGuard)
export class AlunoAvaliacaoController {
  constructor(private readonly service: AlunoAvaliacaoService) {}

  @HttpCode(HttpStatus.OK)
  @Post('lancar')
  async lancarNota(
    @Req() req: Request,
    @Body() dto: LancarNotaDto,
  ): Promise<Result<any>> {
    const response = await this.service.lancarNota(dto);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Nota lançada com sucesso!',
      response,
      req.path,
      null,
      { self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, method: req.method } },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('avaliacao/:id')
  async getNotasPorAvaliacao(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<any>> {
    const response = await this.service.getNotasPorAvaliacao(Number(id));

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Notas recuperadas com sucesso!',
      response,
      req.path,
      null,
      { self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}`, method: req.method } },
    );
  }
}
