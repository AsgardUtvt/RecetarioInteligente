var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";
export class CreateRecetaDto {
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
}
__decorate([
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], CreateRecetaDto.prototype, "id_receta", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", Number)
], CreateRecetaDto.prototype, "idMeal", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strMeal", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strMealAlternate", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strCategory", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strArea", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strCountry", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strInstructions", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strMealThumb", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strTags", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strYoutube", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strIngredient", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strMeasure", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strSource", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strImageSource", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "strCreativeCommonsConfirmed", void 0);
__decorate([
    IsDateString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateRecetaDto.prototype, "dateModified", void 0);
//# sourceMappingURL=create-receta.dto.js.map