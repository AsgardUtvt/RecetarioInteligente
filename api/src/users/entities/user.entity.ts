import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {OneToMany} from "typeorm/browser";
import {Receta} from "../../recetas/entities/receta.entity.js";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    nombre: string;

    @Column()
    paterno: string;

    @Column()
    materno: string;

    @Column()
    foto: Buffer;

    @OneToMany(()=> Receta, (receta) => receta.users)
    recetas: Receta[];

}
