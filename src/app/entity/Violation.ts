import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("violation")
export class Violation extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    abbreviation: string;

    @Column()
    name: string;
}
