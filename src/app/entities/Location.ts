import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity('location')
export class Location extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    Street: string;

    @Column({
        nullable: true
    })
    StreetNumber: number;

    @Column({
        nullable: true
    })
    Unit: number;

    @Column({
        nullable: true
    })
    ParcelID: string;

    // street + address
    @Column({
        nullable: true
    })
    address: string;

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
