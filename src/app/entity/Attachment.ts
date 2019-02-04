import {Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { Citation } from './Citation';

@Entity("attachment")
export class Attachment extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    // name of attachment
    @Column()
    name: string;

    // type of attachment: AttachmentType('JPEG' | 'PNG' | ...)
    @Column()
    type: string;

    @Column()
    data: string;

    @Column({
        nullable: true
    })
    citation_id: number;

}