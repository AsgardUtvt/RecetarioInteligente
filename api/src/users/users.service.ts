import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import {User} from './entities/user.entity.js';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User, 'postgres-connection')
        private userRepository: Repository<User>

    ){}

    // login: Estaba incompleto. Falta comparar el hash.
    async login(data: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ email: data.email });
        if (user && await bcrypt.compare(data.password, user.password)) {
            return user; // Retorna el usuario si coincide
        }
        return null;
    }

    // create y update: Corregido typo y agregado return
    async create(data: CreateUserDto) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(data.password, saltOrRounds);
        const new_data = { ...data, password: hash };
        const register = this.userRepository.create(new_data);
        return await this.userRepository.save(register);
    }

    async update(id_user: number, data: UpdateUserDto) {
        if (data.password) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(data.password, saltOrRounds);
            const new_data = { ...data, password: hash };
            return await this.userRepository.update(id_user, new_data);
        }
        return await this.userRepository.update(id_user, data);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id_user: number) {
        return await this.userRepository.findOneBy({id_user});
    }


    async remove(id_user: number) {
        return await this.userRepository.delete(id_user);
    }
}
