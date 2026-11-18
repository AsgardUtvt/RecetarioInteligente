import { Injectable } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class RecetasService {
    constructor(
        @InjectRepository(Receta)
        private recetaRepository: Repository<Receta>
    ) {}

    async findAll() {
        return await this.recetaRepository.find();
    }

    async create(id_user: number, data: CreateRecetaDto) {
        const register = this.recetaRepository.create({
            ...data,
            id_user,
        });
        return await this.recetaRepository.save(register);
    }

    async findOne(id_user: number, id_receta: number) {
        return await this.recetaRepository.findOne({
            where: { id_receta, id_user },
            relations: { user: true },   // <-- objeto, no ['user']
        });
    }

    async remove(id_user: number, id_receta: number) {
        return await this.recetaRepository.delete({ id_receta, id_user });
    }

    // --- NUEVOS MÉTODOS PARA FAVORITOS ---
    async toggleFavorita(id_user: number, data: CreateRecetaDto) {
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

    async findFavoritas(id_user: number) {
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
            .addSelect('COUNT(r.id_receta)', 'cantidad') // Cuántas veces se guardó
            .groupBy('r.idMeal')
            .addGroupBy('r.strMeal')
            .addGroupBy('r.strMealThumb')
            .orderBy('cantidad', 'DESC')
            .limit(5) // Top 5
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

}
