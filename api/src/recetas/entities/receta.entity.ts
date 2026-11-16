import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity.js";

@Entity()
export class Receta {

    @PrimaryGeneratedColumn()
    id_receta: number;

    @PrimaryColumn({type: 'nvarchar', length: 'MAX'})
    idMeal: number;

    @Column({type: 'text'})
    strMeal: string;

    @Column({type: 'text'})
    strMealAlternate: string;

    @Column({type: 'text'})
    strCategory: string;

    @Column({type: 'text'})
    strArea: string;

    @Column({type: 'text'})
    strCountry: string;

    @Column({type: 'text'})
    strInstructions: string;

    @Column({type: 'text'})
    strMealThumb: string;

    @Column({type: 'text'})
    strTags: string; 

    @Column({type: 'text' })
    strYoutube: string;

    @Column({type: 'jsonb'})
    strIngredient: string;

    @Column({type: 'jsonb'})
    strMeasure: string;

    @Column({type: 'text'})
    strSource: string;

    @Column({type: 'bytea'})
    strImageSource: Buffer;

    @Column({type: 'text'})
    strCreativeCommonsConfirmed: string;
    
    @Column({type: 'datetime' })
    dateModified: Date;
    
    @ManyToOne(() =>User, (user) => user.recetas)
    @JoinColumn({name: 'id_user'})
    users: User;

}
