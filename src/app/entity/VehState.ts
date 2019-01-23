import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("VehState")
export class VehState extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    code: string;

    @Column()
    description: string;
}
