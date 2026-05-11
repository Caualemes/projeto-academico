import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoAvaliacao } from './entities/aluno-avaliacao.entity';
import { AlunoAvaliacaoService } from './service/aluno-avaliacao.service';
import { AlunoAvaliacaoController } from './controller/aluno-avaliacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoAvaliacao])],
  controllers: [AlunoAvaliacaoController],
  providers: [AlunoAvaliacaoService],
})
export class AlunoAvaliacaoModule {}
