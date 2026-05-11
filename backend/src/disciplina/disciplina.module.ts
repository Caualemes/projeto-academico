import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disciplina } from './entities/disciplina.entity';
import { DisciplinaServiceCreate } from './service/disciplina.service.create';
import { DisciplinaServiceUpdate } from './service/disciplina.service.update';
import { DisciplinaServiceFindAll } from './service/disciplina.service.findall';
import { DisciplinaServiceFindById } from './service/disciplina.service.findbyid';
import { DisciplinaServiceDelete } from './service/disciplina.service.delete';
import { DisciplinaControllerCreate } from './controller/disciplina.controller.create';
import { DisciplinaControllerUpdate } from './controller/disciplina.controller.update';
import { DisciplinaControllerFindAll } from './controller/disciplina.controller.findall';
import { DisciplinaControllerFindById } from './controller/disciplina.controller.findbyid';
import { DisciplinaControllerDelete } from './controller/disciplina.controller.delete';

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina])],
  controllers: [
    DisciplinaControllerCreate,
    DisciplinaControllerUpdate,
    DisciplinaControllerFindAll,
    DisciplinaControllerFindById,
    DisciplinaControllerDelete,
  ],
  providers: [
    DisciplinaServiceCreate,
    DisciplinaServiceUpdate,
    DisciplinaServiceFindAll,
    DisciplinaServiceFindById,
    DisciplinaServiceDelete,
  ],
})
export class DisciplinaModule {}
