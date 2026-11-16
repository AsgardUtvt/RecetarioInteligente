import { Receta } from "../../recetas/entities/receta.entity.js";
export declare class User {
    id_user: number;
    nombre: string;
    paterno: string;
    materno: string;
    foto: Buffer;
    recetas: Receta[];
}
