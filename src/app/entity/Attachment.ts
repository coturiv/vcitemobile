import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

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
}