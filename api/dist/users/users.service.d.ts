import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(data: CreateUserDto): Promise<User>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        id_user: number;
        email: string;
        nombre: string;
        paterno: string;
        materno: string;
        foto: string;
        recetas: import("typeorm").Relation<import("../recetas/entities/receta.entity.js").Receta[]>;
    }>;
    findAll(): Promise<User[]>;
    findOne(id_user: number): Promise<User | null>;
    update(id_user: number, data: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id_user: number): Promise<import("typeorm").DeleteResult>;
}
