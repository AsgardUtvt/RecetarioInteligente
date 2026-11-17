var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity.js';
import { Repository } from 'typeorm';
let RecetasService = class RecetasService {
    recetaRepository;
    constructor(recetaRepository) {
        this.recetaRepository = recetaRepository;
    }
    async create(id_user, data) {
        const register = this.recetaRepository.create({ ...data, users: { id_user: id_user }, });
        await this.recetaRepository.save(register);
    }
    async findAll() {
        return await this.recetaRepository.find();
    }
    async findOne(id_user, id_receta) {
        return await this.recetaRepository.findOneBy({
            id_receta,
            users: {
                id_user
            }
        });
    }
    async update(id_user, id_receta, updateRecetaDto) {
        return;
    }
    remove(id_user, id_receta) {
        return this.recetaRepository.createQueryBuilder()
            .delete()
            .from(Receta)
            .where("id_receta = :id_receta", { id_receta })
            .andWhere("id_user = :id_user", { id_user })
            .execute();
    }
};
RecetasService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Receta, 'postgres-connection')),
    __metadata("design:paramtypes", [Repository])
], RecetasService);
export { RecetasService };
//# sourceMappingURL=recetas.service.js.map