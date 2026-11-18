export interface DataUserResponse {

    id_user: number;

    email: string;

    nombre: string;
    
    paterno: string;

    materno: string;

    foto: string | null;

    password: string;

}

export interface DataRecetaResponse {

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

    strImageSource: string;

    strCreativeCommonsConfirmed: string;
    
    dateModified: string;
}


