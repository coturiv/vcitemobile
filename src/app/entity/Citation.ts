import {Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { VehState } from './VehState';
import { VehMake } from './VehMake';
import { VehColor } from './VehColor';
import { Attachment } from './Attachment';

@Entity("citation")
export class Citation extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column({
        nullable: true
    })
    custKey: number;
    
    @Column({
        nullable: true
    })
    docKey: number;
    
    @Column({
        nullable: true
    })
    customerName: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        nullable: true
    })
    timestamp: string;  //Datetime

    @ManyToOne(type => VehState)
    @JoinColumn({name: 'vehstate_id'})
    state: VehState;

    @ManyToOne(type => VehMake)
    @JoinColumn({name: 'vehmake_id'})
    make: VehMake;

    @ManyToOne(type => VehColor)
    @JoinColumn({name: 'vehcolor_id'})
    color: VehColor;

    @OneToMany(type => Attachment, attachment => attachment.id)
    attachments: Attachment[];
}
