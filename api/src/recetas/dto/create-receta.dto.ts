import { IsString, IsInt, IsOptional, IsArray } from "class-validator";

export class CreateRecetaDto {
    @IsOptional()
    @IsInt()
    id_receta: number;

    @IsString()
    idMeal: string;

    @IsString()
    strMeal: string;

    @IsOptional()
    @IsString()
    strMealAlternate?: string;

    @IsOptional()
    @IsString()
    strCategory?: string;

    @IsOptional()
    @IsString()
    strArea?: string;

    @IsOptional()
    @IsString()
    strInstructions?: string;

    @IsOptional()
    @IsString()
    strMealThumb?: string;

    @IsOptional()
    @IsString()
    strTags?: string;

    @IsOptional()
    @IsString()
    strYoutube?: string;

    @IsOptional()
    @IsArray()
    ingredientes?: any[];

    @IsOptional()
    @IsInt()
    id_user?: number;
}
