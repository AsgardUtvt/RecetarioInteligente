import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import {User} from './entities/user.entity.js';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import bcryp from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User, 'postgres-connection')
        private userRepository: Repository<User>

    ){}
    async login(data: UpdateUserDto){
        try {
            const user = await this.userRepository.findOneBy({email: data.email})
            if(user?.password && data?.password){

            }
        } catch (error) {
            return false;
        }

    }
    async create(data: CreateUserDto) {
        const saltOrRounds = 10;
        const hash = await bcryp.hash(data.password, saltOrRounds)
        const new_data = {...data, password: hash};
        const register = this.userRepository.create(new_data);
        await this.userRepository.save(register);

    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id_user: number) {
        return await this.userRepository.findOneBy({id_user});
    }

    async update(id_user: number, data: UpdateUserDto) {
        if(data.password){
            const saltOrRounds = 10
            const hash = await bcryp.hash(data.password, saltOrRounds);
            const new_data = { ...data, password: hash};
            return await this.userRepository.update(id_user, new_data);
        }
    }

    async remove(id_user: number) {
        return await this.userRepository.delete(id_user);
    }
}
