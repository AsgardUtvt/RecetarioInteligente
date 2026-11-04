var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let RecetasService = class RecetasService {
    create(createRecetaDto) {
        return 'This action adds a new receta';
    }
    findAll() {
        return `This action returns all recetas`;
    }
    findOne(id) {
        return `This action returns a #${id} receta`;
    }
    update(id, updateRecetaDto) {
        return `This action updates a #${id} receta`;
    }
    remove(id) {
        return `This action removes a #${id} receta`;
    }
};
RecetasService = __decorate([
    Injectable()
], RecetasService);
export { RecetasService };
//# sourceMappingURL=recetas.service.js.map