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
            host: 'db',
            //name: 'postgres-connection',
            password: 'admin',
            port: 5432,
            synchronize: true,
            type: 'postgres',
            username:'asgard',
        }),

        UsersModule,
        RecetasModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
