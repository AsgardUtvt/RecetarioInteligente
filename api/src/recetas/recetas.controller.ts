import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';

@Controller('recetas')
export class RecetasController {
    constructor(private readonly recetasService: RecetasService) {}

    @Post()
    create(@Body() createRecetaDto: CreateRecetaDto) {
        const id_user = createRecetaDto.id_user;
        if (!id_user) throw new BadRequestException('id_user es requerido');
        return this.recetasService.create(id_user, createRecetaDto);
    }

    @Get()
    findAll() {
        return this.recetasService.findAll();
    }

    // --- ESTÁTICAS: van ANTES que las dinámicas ---
    @Get('estadisticas/populares')
    topRecetasPopulares() {
        return this.recetasService.topRecetasPopulares();
    }

    @Get('estadisticas/categorias')
    recetasPorCategoria() {
        return this.recetasService.recetasPorCategoria();
    }

    @Get('favoritas/:id_user')
    findFavoritas(@Param('id_user', ParseIntPipe) id_user: number) {
        return this.recetasService.findFavoritas(id_user);
    }

    @Post(':id_user/favorita')
    toggleFavorita(
        @Param('id_user', ParseIntPipe) id_user: number,
        @Body() createRecetaDto: CreateRecetaDto,
    ) {
        return this.recetasService.toggleFavorita(id_user, createRecetaDto);
    }
    // ------------------------------------------------

    // --- DINÁMICAS: van AL FINAL ---
    @Get(':id_user/:id_receta')
    findOne(
        @Param('id_user', ParseIntPipe) id_user: number,
        @Param('id_receta', ParseIntPipe) id_receta: number
    ) {
        return this.recetasService.findOne(id_user, id_receta);
    }

    @Delete(':id_user/:id_receta')
    remove(
        @Param('id_user', ParseIntPipe) id_user: number,
        @Param('id_receta', ParseIntPipe) id_receta: number
    ) {
        return this.recetasService.remove(id_user, id_receta);
    }
}
