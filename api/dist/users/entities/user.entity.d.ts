import { Receta } from "../../recetas/entities/receta.entity.js";
export declare class User {
    id_user: number;
    email: string;
    nombre: string;
    paterno: string;
    materno: string;
    foto: string;
    recetas: Receta[];
    password: string;
}
