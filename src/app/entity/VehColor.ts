import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("VehColor")
export class VehColor extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    code: string;

    @Column()
    description: string;
}
