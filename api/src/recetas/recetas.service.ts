import { Injectable } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
import {InjectRepository} from '@nestjs/typeorm';
import {Receta} from './entities/receta.entity.js';
import {Repository} from 'typeorm';
import {rootCertificates} from 'tls';
import {ReturningResultsEntityUpdator} from 'typeorm/query-builder/ReturningResultsEntityUpdator.js';

@Injectable()
export class RecetasService {
    constructor(
        @InjectRepository(Receta)
        private recetaRepository: Repository<Receta>
    ){}
    async findAll() {
        return await this.recetaRepository.find();
    }
// create: Falta el return y la relación debe apuntar a la Primary Key (asumo que es 'id' o 'id_user')
async create(id_user: number, data: CreateRecetaDto) {
    const register = this.recetaRepository.create({ 
        ...data, 
        users: { id_user: id_user } // Cambia 'id' por 'id_user' si tu PK en User es id_user
    });
    return await this.recetaRepository.save(register);
}

// findOne: Mismo error de relación
async findOne(id_user: number, id_receta: number) {
    return await this.recetaRepository.findOneBy({
        id_receta,
        users: { id_user: id_user }
    });
}

// remove: El nombre en 'andWhere' debe ser el de la columna en la BD (ej. user_id), no el de la entidad
async remove(id_user: number, id_receta: number) {
    return await this.recetaRepository.createQueryBuilder()
        .delete()
        .from(Receta)
        .where("id_receta = :id_receta", { id_receta })
        .andWhere("user_id = :id_user", { id_user }) // Asegúrate que la columna se llame user_id
        .execute();
}

// topRecetasPopulares: groupBy debe usar el alias de la tabla
async topRecetasPopulares() {
    return await this.recetaRepository.createQueryBuilder('r')
        .select("COUNT(r.idMeal)", "cantidad")
        .addSelect("r.idMeal", "receta")
        .groupBy("r.idMeal") // Corregido
        .getRawMany();
}

    private async cantidadRecetasPorAno(){

    }


}
