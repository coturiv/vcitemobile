import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity("location")
export class Location extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    street: string;

    @Column({
        nullable: true
    })
    unit: number;

    @Column({
        nullable: true
    })
    latitude: number;

    @Column({
        nullable: true
    })
    longitude: number;

    @Column({
        nullable: true
    })
    source: string;     // 'picker' | 'maps' | 'input';
}