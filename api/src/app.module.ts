import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { RecetasModule } from './recetas/recetas.module.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './users/entities/user.entity.js';
import {Receta} from './recetas/entities/receta.entity.js';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
            database: 'recetario',
            entities: [User, Receta],
            password: 'admin',
            synchronize: true,
            username:'asgard',
            name: 'postgres-connection',
            type: 'postgres',
            host: 'db',
            port: 5432,
        }),

        UsersModule,
        RecetasModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
