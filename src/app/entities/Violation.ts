import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Citation } from '../entities';

@Entity('violation')
export class Violation extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    violation_id: string;

    @Column()
    description: string;

    @ManyToOne(type => Citation, citation => citation.violations)
    @JoinColumn({name: 'citation_id'})
    citation: Citation;

}
