import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
export declare class RecetasService {
    create(createRecetaDto: CreateRecetaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRecetaDto: UpdateRecetaDto): string;
    remove(id: number): string;
}
