import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity.js";

@Entity()
export class Receta {

    @PrimaryGeneratedColumn()
    id_receta: number;

    @Column({type: 'varchar', length: '500'})
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

    @Column({type: 'text'})
    strImageSource: string;

    @Column({type: 'text'})
    strCreativeCommonsConfirmed: string;
    
    @Column({type: 'timestamp' })
    dateModified: Date;
    
    @ManyToOne('User', (user: User) => user.recetas,
        { onDelete: 'CASCADE'}
    )
    @JoinColumn({name: 'id_user'})
    users: User;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechaInsercion: Date;


}
