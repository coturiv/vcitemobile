import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity('vehmake')
export class VehMake extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    Abbreviation: string;

    @Column()
    Name: string;
}
