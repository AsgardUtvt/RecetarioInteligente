import {IsDateString, IsInt, IsOptional, IsString} from "class-validator";

export class CreateRecetaDto {

    @IsOptional()
    @IsInt()
    id_receta: number;

    @IsOptional()
    @IsString()
    idMeal: number;

    @IsOptional()
    @IsString()
    strMeal: string;

    @IsOptional()
    @IsString()
    strMealAlternate: string;

    @IsOptional()
    @IsString()
    strCategory: string;

    @IsOptional()
    @IsString()
    strArea: string;

    @IsOptional()
    @IsString()
    strCountry: string;

    @IsOptional()
    @IsString()
    strInstructions: string;

    @IsOptional()
    @IsString()
    strMealThumb: string;

    @IsOptional()
    @IsString()
    strTags: string; 

    @IsOptional()
    @IsString()
    strYoutube: string;

    @IsOptional()
    @IsString()
    strIngredient: string;

    @IsOptional()
    @IsString()
    strMeasure: string;

    @IsOptional()
    @IsString()
    strSource: string;

    @IsOptional()
    @IsString()
    strImageSource: string;

    @IsOptional()
    @IsString()
    strCreativeCommonsConfirmed: string;
    
    @IsDateString()
    @IsOptional()
    dateModified: string;
}
