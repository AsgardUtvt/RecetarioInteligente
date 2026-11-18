var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity.js';
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(data) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(data.password, saltOrRounds);
        const { foto, ...rest } = data;
        const new_data = {
            ...rest,
            password: hash,
            foto: foto === null ? undefined : foto,
        };
        const register = this.userRepository.create(new_data);
        return await this.userRepository.save(register);
    }
    async login(data) {
        const user = await this.userRepository.findOneBy({ email: data.email });
        if (user && user.password && await bcrypt.compare(data.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new BadRequestException('Credenciales inválidas');
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id_user) {
        return await this.userRepository.findOneBy({ id_user });
    }
    async update(id_user, data) {
        const { foto, ...rest } = data;
        if (data.password) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(data.password, saltOrRounds);
            const new_data = {
                ...rest,
                password: hash,
                foto: foto === null ? undefined : foto,
            };
            return await this.userRepository.update(id_user, new_data);
        }
        return await this.userRepository.update(id_user, {
            ...rest,
            foto: foto === null ? undefined : foto,
        });
    }
    async remove(id_user) {
        return await this.userRepository.delete(id_user);
    }
};
UsersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map