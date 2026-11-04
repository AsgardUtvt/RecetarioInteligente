import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { RecetasModule } from './recetas/recetas.module.js';

@Module({
  imports: [UsersModule, RecetasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
