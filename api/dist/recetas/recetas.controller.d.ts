import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
export declare class RecetasController {
    private readonly recetasService;
    constructor(recetasService: RecetasService);
    create(createRecetaDto: CreateRecetaDto, req: any): Promise<import("./entities/receta.entity.js").Receta>;
    findAll(): Promise<import("./entities/receta.entity.js").Receta[]>;
    findOne(id_user: number, id_receta: number): Promise<import("./entities/receta.entity.js").Receta | null>;
    remove(id_user: number, id_receta: number): Promise<import("typeorm").DeleteResult>;
}
