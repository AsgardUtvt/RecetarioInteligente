import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';
import { Req } from '@nestjs/common';
@Controller('recetas')
export class RecetasController {
    constructor(private readonly recetasService: RecetasService) {}

    @Post()
    create(@Body() createRecetaDto: CreateRecetaDto, @Req() req: any) {
        const id_user = req.user.id;
        return this.recetasService.create(id_user, createRecetaDto);
    }

    @Get()
    findAll() {
        return this.recetasService.findAll();
    }

    @Get(':id_user/:id_receta')
    findOne(
        @Param('id_user') id_user: number,
        @Param('id_receta', ParseIntPipe) id_receta: number  
    ) {
        return this.recetasService.findOne(id_user,id_receta);
    }
/*
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
        return this.recetasService.update(+id, updateRecetaDto);
    }
*/
    @Delete(':id_user/:id_receta')
    remove(
        @Param('id_user', ParseIntPipe) id_user: number,
        @Param('id_receta', ParseIntPipe) id_receta: number
    ) {
        return this.recetasService.remove(id_user, id_receta);
    }
}
