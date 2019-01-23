import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("Violation")
export class Violation extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    code: string;

    @Column()
    description: string;
}
