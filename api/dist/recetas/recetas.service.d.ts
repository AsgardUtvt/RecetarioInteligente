import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { Receta } from './entities/receta.entity.js';
import { Repository } from 'typeorm';
export declare class RecetasService {
    private recetaRepository;
    constructor(recetaRepository: Repository<Receta>);
    findAll(): Promise<Receta[]>;
    create(id_user: number, data: CreateRecetaDto): Promise<Receta>;
    findOne(id_user: number, id_receta: number): Promise<Receta | null>;
    remove(id_user: number, id_receta: number): Promise<import("typeorm").DeleteResult>;
    topRecetasPopulares(): Promise<any[]>;
    private cantidadRecetasPorAno;
}
