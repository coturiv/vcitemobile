import {Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { Citation } from './Citation';

@Entity('attachment')
export class Attachment extends BaseEntity {
    @PrimaryColumn()
    id: number;

    // name of attachment
    @Column()
    Name: string;

    // type of attachment: AttachmentType('JPEG' | 'PNG' | ...)
    @Column()
    type: string;

    @Column()
    data: string;

    @ManyToOne(type => Citation, citation => citation.attachments)
    @JoinColumn({name: 'citation_id'})
    citation: Citation;
}
