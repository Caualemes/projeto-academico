import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { AlunoControllerCreate } from './controller/aluno.controller.create';
import { AlunoControllerUpdate } from './controller/aluno.controller.update';
import { AlunoControllerFindAll } from './controller/aluno.controller.findall';
import { AlunoControllerFindById } from './controller/aluno.controller.findbyid';
import { AlunoControllerDelete } from './controller/aluno.controller.delete';
import { AlunoServiceCreate } from './service/aluno.service.create';
import { AlunoServiceUpdate } from './service/aluno.service.update';
import { AlunoServiceFindAll } from './service/aluno.service.findall';
import { AlunoServiceFindById } from './service/aluno.service.findbyid';
import { AlunoServiceDelete } from './service/aluno.service.delete';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  controllers: [
    AlunoControllerCreate,
    AlunoControllerUpdate,
    AlunoControllerFindAll,
    AlunoControllerFindById,
    AlunoControllerDelete,
  ],
  providers: [
    AlunoServiceCreate,
    AlunoServiceUpdate,
    AlunoServiceFindAll,
    AlunoServiceFindById,
    AlunoServiceDelete,
  ],
})
export class AlunoModule {}
