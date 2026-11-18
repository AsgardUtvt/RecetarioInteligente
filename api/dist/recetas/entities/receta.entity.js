var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity.js";
let Receta = class Receta {
    id_receta;
    idMeal;
    strMeal;
    strMealAlternate;
    strCategory;
    strArea;
    strCountry;
    strInstructions;
    strMealThumb;
    strTags;
    strYoutube;
    strIngredient;
    strMeasure;
    strSource;
    strImageSource;
    strCreativeCommonsConfirmed;
    dateModified;
    users;
    fechaInsercion;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Receta.prototype, "id_receta", void 0);
__decorate([
    Column({ type: 'varchar', length: '500' }),
    __metadata("design:type", Number)
], Receta.prototype, "idMeal", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strMeal", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strMealAlternate", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strCategory", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strArea", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strCountry", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strInstructions", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strMealThumb", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strTags", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strYoutube", void 0);
__decorate([
    Column({ type: 'jsonb' }),
    __metadata("design:type", String)
], Receta.prototype, "strIngredient", void 0);
__decorate([
    Column({ type: 'jsonb' }),
    __metadata("design:type", String)
], Receta.prototype, "strMeasure", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strSource", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strImageSource", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "strCreativeCommonsConfirmed", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Receta.prototype, "dateModified", void 0);
__decorate([
    ManyToOne('User', (user) => user.recetas, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'id_user' }),
    __metadata("design:type", User)
], Receta.prototype, "users", void 0);
__decorate([
    Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Receta.prototype, "fechaInsercion", void 0);
Receta = __decorate([
    Entity()
], Receta);
export { Receta };
//# sourceMappingURL=receta.entity.js.map