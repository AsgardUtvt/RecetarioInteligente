import { Injectable } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
import {InjectRepository} from '@nestjs/typeorm';
import {Receta} from './entities/receta.entity.js';
import {Repository} from 'typeorm';
import {rootCertificates} from 'tls';

@Injectable()
export class RecetasService {
    constructor(
        @InjectRepository(Receta, 'postgres-connection')
        private recetaRepository: Repository<Receta>
    ){}
    async create(id_user: number,data: CreateRecetaDto) {
        const register = this.recetaRepository.create({...data, users:{id_user: id_user},});
        await this.recetaRepository.save(register);
    }

    async findAll() {
        return await this.recetaRepository.find();
    }

    async findOne(id_user: number ,id_receta: number) {
        return await this.recetaRepository.findOneBy({
            id_receta,
            users: {
                id_user
            }
        });
    }

    async update( id_user: number , id_receta: number, updateRecetaDto: UpdateRecetaDto) {
        return ;
    }

    remove(id_user: number ,id_receta: number) {
        return this.recetaRepository.createQueryBuilder()
        .delete()
        .from(Receta)
        .where("id_receta = :id_receta", {id_receta})
        .andWhere("id_user = :id_user", {id_user})
        .execute();
    }
}
