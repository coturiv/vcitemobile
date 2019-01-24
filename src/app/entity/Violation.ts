import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("Violation")
export class Violation extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    abbreviation: string;

    @Column()
    name: string;
}
