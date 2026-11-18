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
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
let RecetasController = class RecetasController {
    recetasService;
    constructor(recetasService) {
        this.recetasService = recetasService;
    }
    create(createRecetaDto) {
        const id_user = createRecetaDto.id_user;
        if (!id_user)
            throw new BadRequestException('id_user es requerido');
        return this.recetasService.create(id_user, createRecetaDto);
    }
    findAll() {
        return this.recetasService.findAll();
    }
    topRecetasPopulares() {
        return this.recetasService.topRecetasPopulares();
    }
    recetasPorCategoria() {
        return this.recetasService.recetasPorCategoria();
    }
    findFavoritas(id_user) {
        return this.recetasService.findFavoritas(id_user);
    }
    toggleFavorita(id_user, createRecetaDto) {
        return this.recetasService.toggleFavorita(id_user, createRecetaDto);
    }
    findOne(id_user, id_receta) {
        return this.recetasService.findOne(id_user, id_receta);
    }
    remove(id_user, id_receta) {
        return this.recetasService.remove(id_user, id_receta);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRecetaDto]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "findAll", null);
__decorate([
    Get('estadisticas/populares'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "topRecetasPopulares", null);
__decorate([
    Get('estadisticas/categorias'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "recetasPorCategoria", null);
__decorate([
    Get('favoritas/:id_user'),
    __param(0, Param('id_user', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "findFavoritas", null);
__decorate([
    Post(':id_user/favorita'),
    __param(0, Param('id_user', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateRecetaDto]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "toggleFavorita", null);
__decorate([
    Get(':id_user/:id_receta'),
    __param(0, Param('id_user', ParseIntPipe)),
    __param(1, Param('id_receta', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "findOne", null);
__decorate([
    Delete(':id_user/:id_receta'),
    __param(0, Param('id_user', ParseIntPipe)),
    __param(1, Param('id_receta', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "remove", null);
RecetasController = __decorate([
    Controller('recetas'),
    __metadata("design:paramtypes", [RecetasService])
], RecetasController);
export { RecetasController };
//# sourceMappingURL=recetas.controller.js.map