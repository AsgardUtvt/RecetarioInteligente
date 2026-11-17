import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recetasService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
        return this.recetasService.update(+id, updateRecetaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recetasService.remove(+id);
    }
}
