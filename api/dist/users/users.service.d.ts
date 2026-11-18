import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    login(data: UpdateUserDto): Promise<User | null>;
    create(data: CreateUserDto): Promise<User>;
    update(id_user: number, data: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    findAll(): Promise<User[]>;
    findOne(id_user: number): Promise<User | null>;
    remove(id_user: number): Promise<import("typeorm").DeleteResult>;
}
