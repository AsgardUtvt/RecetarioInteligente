var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { RecetasModule } from './recetas/recetas.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity.js';
import { Receta } from './recetas/entities/receta.entity.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forRoot({
                autoLoadEntities: true,
                database: 'recetario',
                entities: [User, Receta],
                password: 'admin',
                synchronize: true,
                username: 'asgard',
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map