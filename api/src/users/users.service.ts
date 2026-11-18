import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity.js'; // Ajusta la ruta si es necesario
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    
    // Desestructuramos para manejar 'foto' por separado y convertir null a undefined
    const { foto, ...rest } = data;
    
    const new_data = {
      ...rest,
      password: hash,
      foto: foto === null ? undefined : foto, // TypeORM prefiere undefined sobre null
    };

    const register = this.userRepository.create(new_data);
    return await this.userRepository.save(register);
  }

  async login(data: { email: string; password: string }) {
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

  async findOne(id_user: number) {
    return await this.userRepository.findOneBy({ id_user });
  }

async update(id_user: number, data: UpdateUserDto) {
  const { foto, ...rest } = data;
  const payload: any = { ...rest };

  if (data.password) {
    payload.password = await bcrypt.hash(data.password, 10);
  }
  if (foto !== undefined) {
    payload.foto = foto === null ? undefined : foto;
  }

  await this.userRepository.update(id_user, payload);

  const updated = await this.userRepository.findOneBy({ id_user });
  if (!updated) throw new NotFoundException('Usuario no encontrado');

  const { password, ...result } = updated;
  return result; // sin password, listo para el frontend
}

  async remove(id_user: number) {
    return await this.userRepository.delete(id_user);
  }
}
