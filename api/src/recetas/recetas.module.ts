import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service.js';
import { RecetasController } from './recetas.controller.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Receta} from './entities/receta.entity.js';

@Module({
    imports:[
        TypeOrmModule.forFeature([Receta], 'postgres-connection')
    ],
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}
