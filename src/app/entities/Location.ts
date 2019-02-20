import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("location")
export class Location extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    street: string;

    @Column()
    unit: number;

    @Column({
        nullable: true
    })
    latitude: number;

    @Column({
        nullable: true
    })
    longitude: number;
}