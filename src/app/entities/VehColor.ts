import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity('vehcolor')
export class VehColor extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    Abbreviation: string;

    @Column()
    Name: string;
}
