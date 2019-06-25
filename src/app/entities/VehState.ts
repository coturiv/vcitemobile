import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity('vehstate')
export class VehState extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    Abbreviation: string;

    @Column()
    Name: string;
}
