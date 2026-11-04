import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service.js';
import { RecetasController } from './recetas.controller.js';

@Module({
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}
