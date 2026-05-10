import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { ProfessorControllerCreate } from './controller/professor.controller.create';
import { ProfessorControllerDelete } from './controller/professor.controller.delete';
import { ProfessorControllerFindAll } from './controller/professor.controller.findall';
import { ProfessorControllerFindById } from './controller/professor.controller.findbyid';
import { ProfessorControllerUpdate } from './controller/professor.controller.update';
import { Professor } from './entities/professor.entity';
import { ProfessorServiceCreate } from './service/professor.service.create';
import { ProfessorServiceDelete } from './service/professor.service.delete';
import { ProfessorServiceFindAll } from './service/professor.service.findall';
import { ProfessorServiceFindById } from './service/professor.service.findbyid';
import { ProfessorServiceUpdate } from './service/professor.service.update';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, Usuario])],
  controllers: [
    ProfessorControllerCreate,
    ProfessorControllerFindAll,
    ProfessorControllerFindById,
    ProfessorControllerUpdate,
    ProfessorControllerDelete,
  ],
  providers: [
    ProfessorServiceCreate,
    ProfessorServiceFindAll,
    ProfessorServiceFindById,
    ProfessorServiceUpdate,
    ProfessorServiceDelete,
  ],
  exports: [
    ProfessorServiceCreate,
    ProfessorServiceFindAll,
    ProfessorServiceFindById,
    ProfessorServiceUpdate,
    ProfessorServiceDelete,
  ],
})
export class ProfessorModule {}
