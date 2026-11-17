import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
export declare class RecetasController {
    private readonly recetasService;
    constructor(recetasService: RecetasService);
    create(createRecetaDto: CreateRecetaDto, req: any): Promise<void>;
    findAll(): Promise<import("./entities/receta.entity.js").Receta[]>;
    findOne(id: string): Promise<import("./entities/receta.entity.js").Receta | null>;
    update(id: string, updateRecetaDto: UpdateRecetaDto): Promise<void>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
