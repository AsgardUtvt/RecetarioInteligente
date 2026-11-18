var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm";
import { User } from "../../users/entities/user.entity.js";
let Receta = class Receta {
    id_receta;
    idMeal;
    strMeal;
    strMealAlternate;
    strCategory;
    strArea;
    strInstructions;
    strMealThumb;
    strTags;
    strYoutube;
    ingredientes;
    user;
    id_user;
    fechaInsercion;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Receta.prototype, "id_receta", void 0);
__decorate([
    Index(),
    Column({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Receta.prototype, "idMeal", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strMeal", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Receta.prototype, "strMealAlternate", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Receta.prototype, "strCategory", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Receta.prototype, "strArea", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Receta.prototype, "strInstructions", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Receta.prototype, "strMealThumb", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Receta.prototype, "strTags", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Receta.prototype, "strYoutube", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Receta.prototype, "ingredientes", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.recetas, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'id_user' }),
    __metadata("design:type", User)
], Receta.prototype, "user", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Receta.prototype, "id_user", void 0);
__decorate([
    Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Receta.prototype, "fechaInsercion", void 0);
Receta = __decorate([
    Entity()
], Receta);
export { Receta };
//# sourceMappingURL=receta.entity.js.map