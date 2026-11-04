import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
export declare class RecetasController {
    private readonly recetasService;
    constructor(recetasService: RecetasService);
    create(createRecetaDto: CreateRecetaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRecetaDto: UpdateRecetaDto): string;
    remove(id: string): string;
}
