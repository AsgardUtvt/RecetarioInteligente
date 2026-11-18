import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
import { Receta } from './entities/receta.entity.js';
import { Repository } from 'typeorm';
export declare class RecetasService {
    private recetaRepository;
    constructor(recetaRepository: Repository<Receta>);
    create(id_user: number, data: CreateRecetaDto): Promise<void>;
    findAll(): Promise<Receta[]>;
    findOne(id_user: number, id_receta: number): Promise<Receta | null>;
    update(id_user: number, id_receta: number, updateRecetaDto: UpdateRecetaDto): Promise<void>;
    remove(id_user: number, id_receta: number): Promise<import("typeorm").DeleteResult>;
    private topRecetasPopulares;
    private recetasPorRegion;
}
