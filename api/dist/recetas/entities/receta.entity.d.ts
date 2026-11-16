import { User } from "../../users/entities/user.entity.js";
export declare class Receta {
    id_receta: number;
    idMeal: number;
    strMeal: string;
    strMealAlternate: string;
    strCategory: string;
    strArea: string;
    strCountry: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    strIngredient: string;
    strMeasure: string;
    strSource: string;
    strImageSource: Buffer;
    strCreativeCommonsConfirmed: string;
    dateModified: Date;
    users: User;
}
