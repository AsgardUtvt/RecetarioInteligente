import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
export declare class RecetasController {
    private readonly recetasService;
    constructor(recetasService: RecetasService);
    create(createRecetaDto: CreateRecetaDto): Promise<import("./entities/receta.entity.js").Receta>;
    findAll(): Promise<import("./entities/receta.entity.js").Receta[]>;
    topRecetasPopulares(): Promise<any[]>;
    recetasPorCategoria(): Promise<any[]>;
    findFavoritas(id_user: number): Promise<import("./entities/receta.entity.js").Receta[]>;
    toggleFavorita(id_user: number, createRecetaDto: CreateRecetaDto): Promise<{
        isFavorita: boolean;
    }>;
    findOne(id_user: number, id_receta: number): Promise<import("./entities/receta.entity.js").Receta | null>;
    remove(id_user: number, id_receta: number): Promise<import("typeorm").DeleteResult>;
}
