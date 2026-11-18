import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity.js").User>;
    findAll(): Promise<import("./entities/user.entity.js").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity.js").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id_user: number;
        email: string;
        nombre: string;
        paterno: string;
        materno: string;
        foto: string;
        recetas: import("../recetas/entities/receta.entity.js").Receta[];
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        id_user: number;
        email: string;
        nombre: string;
        paterno: string;
        materno: string;
        foto: string;
        recetas: import("../recetas/entities/receta.entity.js").Receta[];
    }>;
}
