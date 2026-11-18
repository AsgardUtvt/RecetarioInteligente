import { User } from "../../users/entities/user.entity.js";
export declare class Receta {
    id_receta: number;
    idMeal: string;
    strMeal: string;
    strMealAlternate: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    ingredientes: any[];
    user: User;
    id_user: number;
    fechaInsercion: Date;
}
