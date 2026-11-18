import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, type Relation } from "typeorm";
import {OneToMany} from "typeorm/browser";
import {Receta} from "../../recetas/entities/receta.entity.js";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({type: 'varchar', length:'255', unique: true})
    email: string;

    @Column({type: 'varchar', length:'255'})
    nombre: string;

    @Column({type: 'varchar', length:'255'})
    paterno: string;

    @Column({type: 'varchar', length:'255'})
    materno: string;

    @Column({type: 'text'})
    foto: string;

@OneToMany('Receta', (receta: Receta) => receta.user)  // <-- receta.user, no receta.users
recetas: Receta[];

    @Column({type: 'varchar', length: '255'})
    password: string;

}
