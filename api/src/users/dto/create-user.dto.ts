import {IsEmail, IsInt, IsOptional, IsString, Min, MinLength} from "class-validator";

export class CreateUserDto {
    
    @IsOptional()
    @IsInt()
    id_user: number;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(2)
    nombre: string;

    
    @MinLength(4)
    paterno: string;

    @MinLength(4)
    materno: string;

    @IsString()
    @IsOptional()
    foto: string | null;

    @IsString()
    password: string;

}
