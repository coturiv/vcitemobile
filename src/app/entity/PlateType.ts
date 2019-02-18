import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("platetype")
export class PlateType extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    abbreviation: string;

    @Column()
    name: string;
}