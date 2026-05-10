import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioControllerCreate } from './controller/usuario.controller.create';
import { UsuarioControllerDelete } from './controller/usuario.controller.delete';
import { UsuarioControllerFindAll } from './controller/usuario.controller.findall';
import { UsuarioControllerFindById } from './controller/usuario.controller.findbyid';
import { UsuarioControllerUpdate } from './controller/usuario.controller.update';
import { Usuario } from './entities/usuario.entity';
import { UsuarioServiceCreate } from './service/usuario.service.create';
import { UsuarioServiceDelete } from './service/usuario.service.delete';
import { UsuarioServiceFindAll } from './service/usuario.service.findall';
import { UsuarioServiceFindByEmail } from './service/usuario.service.findbyemail';
import { UsuarioServiceFindById } from './service/usuario.service.findbyid';
import { UsuarioServiceUpdate } from './service/usuario.service.update';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [
    UsuarioControllerCreate,
    UsuarioControllerFindAll,
    UsuarioControllerFindById,
    UsuarioControllerUpdate,
    UsuarioControllerDelete,
  ],
  providers: [
    UsuarioServiceCreate,
    UsuarioServiceFindAll,
    UsuarioServiceFindByEmail,
    UsuarioServiceFindById,
    UsuarioServiceUpdate,
    UsuarioServiceDelete,
  ],
  exports: [UsuarioServiceCreate, UsuarioServiceFindAll, UsuarioServiceFindByEmail],
})
export class UsuarioModule {}
