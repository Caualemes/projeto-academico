import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoDisciplina } from './entities/aluno-disciplina.entity';
import { AlunoDisciplinaService } from './service/aluno-disciplina.service';
import { AlunoDisciplinaController } from './controller/aluno-disciplina.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoDisciplina])],
  controllers: [AlunoDisciplinaController],
  providers: [AlunoDisciplinaService],
})
export class AlunoDisciplinaModule {}
