import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("VehMake")
export class VehMake extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    abbreviation: string;

    @Column()
    name: string;
}
