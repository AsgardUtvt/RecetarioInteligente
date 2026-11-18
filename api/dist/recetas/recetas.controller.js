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
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { Req } from '@nestjs/common';
let RecetasController = class RecetasController {
    recetasService;
    constructor(recetasService) {
        this.recetasService = recetasService;
    }
    create(createRecetaDto, req) {
        const id_user = req.user.id;
        return this.recetasService.create(id_user, createRecetaDto);
    }
    findAll() {
        return this.recetasService.findAll();
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
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRecetaDto, Object]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "findAll", null);
__decorate([
    Get(':id_user/:id_receta'),
    __param(0, Param('id_user')),
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