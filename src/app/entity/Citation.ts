import {Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { VehState } from './VehState';
import { VehMake } from './VehMake';
import { VehColor } from './VehColor';

@Entity("Citation")
export class Citation extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    custKey: number;
    
    @Column()
    docKey: number;
    
    // @Column()
    // customerName: string;

    @Column()
    description: string;

    @Column()
    timestamp: string;  //Datetime

    @ManyToOne(type => VehState)
    @JoinColumn({name: 'vehstate_id'})
    vehstate_id: VehState;

    @ManyToOne(type => VehMake)
    @JoinColumn({name: 'vehmake_id'})
    vehmake_id: VehMake;

    @ManyToOne(type => VehColor)
    @JoinColumn({name: 'vehcolor_id'})
    vehcolor_id: VehColor;
}