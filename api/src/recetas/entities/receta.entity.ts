import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm";
import { User } from "../../users/entities/user.entity.js";

@Entity()
export class Receta {
    @PrimaryGeneratedColumn()
    id_receta: number;

    @Index()
    @Column({ type: 'varchar', length: 50 })
    idMeal: string; // TheMealDB usa strings para los IDs

    @Column({ type: 'text' })
    strMeal: string;

    @Column({ type: 'text', nullable: true })
    strMealAlternate: string;

    @Column({ type: 'text', nullable: true })
    strCategory: string;

    @Column({ type: 'text', nullable: true })
    strArea: string;

    @Column({ type: 'text', nullable: true })
    strInstructions: string;

    @Column({ type: 'text', nullable: true })
    strMealThumb: string;

    @Column({ type: 'text', nullable: true })
    strTags: string;

    @Column({ type: 'text', nullable: true })
    strYoutube: string;

    @Column({ type: 'jsonb', nullable: true })
    ingredientes: any[]; // Para guardar el array de ingredientes y medidas

    @ManyToOne(() => User, (user) => user.recetas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_user' })
    user: User;

    @Column()
    id_user: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaInsercion: Date;
}
