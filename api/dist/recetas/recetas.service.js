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
    async findAll() {
        return await this.recetaRepository.find();
    }
    async create(id_user, data) {
        const register = this.recetaRepository.create({
            ...data,
            id_user,
        });
        return await this.recetaRepository.save(register);
    }
    async findOne(id_user, id_receta) {
        return await this.recetaRepository.findOne({
            where: { id_receta, id_user },
            relations: { user: true },
        });
    }
    async remove(id_user, id_receta) {
        return await this.recetaRepository.delete({ id_receta, id_user });
    }
    async toggleFavorita(id_user, data) {
        const existente = await this.recetaRepository.findOne({
            where: { idMeal: data.idMeal, id_user },
        });
        if (existente) {
            await this.recetaRepository.remove(existente);
            return { isFavorita: false };
        }
        const nueva = this.recetaRepository.create({
            ...data,
            id_user,
        });
        await this.recetaRepository.save(nueva);
        return { isFavorita: true };
    }
    async findFavoritas(id_user) {
        return await this.recetaRepository.find({
            where: { id_user },
            order: { fechaInsercion: 'DESC' },
        });
    }
    async topRecetasPopulares() {
        return await this.recetaRepository.createQueryBuilder('r')
            .select('r.idMeal', 'idMeal')
            .addSelect('r.strMeal', 'strMeal')
            .addSelect('r.strMealThumb', 'strMealThumb')
            .addSelect('COUNT(r.id_receta)', 'cantidad')
            .groupBy('r.idMeal')
            .addGroupBy('r.strMeal')
            .addGroupBy('r.strMealThumb')
            .orderBy('cantidad', 'DESC')
            .limit(5)
            .getRawMany();
    }
    async recetasPorCategoria() {
        return await this.recetaRepository.createQueryBuilder('r')
            .select('r.strCategory', 'categoria')
            .addSelect('COUNT(r.id_receta)', 'cantidad')
            .groupBy('r.strCategory')
            .orderBy('cantidad', 'DESC')
            .getRawMany();
    }
};
RecetasService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Receta)),
    __metadata("design:paramtypes", [Repository])
], RecetasService);
export { RecetasService };
//# sourceMappingURL=recetas.service.js.map