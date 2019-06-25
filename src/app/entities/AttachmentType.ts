import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity('attachment_type')
export class AttachmentType extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
