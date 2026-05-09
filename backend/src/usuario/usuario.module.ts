import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioControllerCreate } from './controller/usuario.controller.create';
import { UsuarioControllerFindAll } from './controller/usuario.controller.findall';
import { Usuario } from './entities/usuario.entity';
import { UsuarioServiceCreate } from './service/usuario.service.create';
import { UsuarioServiceFindAll } from './service/usuario.service.findall';
import { UsuarioServiceFindByEmail } from './service/usuario.service.findbyemail';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [
    UsuarioControllerCreate,
    UsuarioControllerFindAll,
  ],
  providers: [
    UsuarioServiceCreate,
    UsuarioServiceFindAll,
    UsuarioServiceFindByEmail,
  ],
  exports: [UsuarioServiceCreate, UsuarioServiceFindAll, UsuarioServiceFindByEmail],
})
export class UsuarioModule {}
