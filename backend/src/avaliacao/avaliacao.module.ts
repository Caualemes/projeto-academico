import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { AvaliacaoServiceCreate } from './service/avaliacao.service.create';
import { AvaliacaoServiceUpdate } from './service/avaliacao.service.update';
import { AvaliacaoServiceFindAll } from './service/avaliacao.service.findall';
import { AvaliacaoServiceFindById } from './service/avaliacao.service.findbyid';
import { AvaliacaoServiceDelete } from './service/avaliacao.service.delete';
import { AvaliacaoControllerCreate } from './controller/avaliacao.controller.create';
import { AvaliacaoControllerUpdate } from './controller/avaliacao.controller.update';
import { AvaliacaoControllerFindAll } from './controller/avaliacao.controller.findall';
import { AvaliacaoControllerFindById } from './controller/avaliacao.controller.findbyid';
import { AvaliacaoControllerDelete } from './controller/avaliacao.controller.delete';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao])],
  controllers: [
    AvaliacaoControllerCreate,
    AvaliacaoControllerUpdate,
    AvaliacaoControllerFindAll,
    AvaliacaoControllerFindById,
    AvaliacaoControllerDelete,
  ],
  providers: [
    AvaliacaoServiceCreate,
    AvaliacaoServiceUpdate,
    AvaliacaoServiceFindAll,
    AvaliacaoServiceFindById,
    AvaliacaoServiceDelete,
  ],
})
export class AvaliacaoModule {}
