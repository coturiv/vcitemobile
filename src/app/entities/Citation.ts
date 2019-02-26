import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { VehState } from './VehState';
import { VehMake } from './VehMake';
import { VehColor } from './VehColor';
import { Violation } from './Violation';
import { Attachment } from './Attachment';
import { Location } from './Location';

@Entity("citation")
export class Citation extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    // Customer ID
    @Column({
        nullable: true
    })
    custKey: number;

    // Serial Number
    @Column({
        nullable: true
    })
    serial_number: string;
    
    // Document Key
    @Column({
        nullable: true
    })
    docKey: number;
    
    // Issue Date
    @Column({
        nullable: true
    })
    issue_date: string;
    
    // Issue Time
    @Column({
        nullable: true
    })
    issue_time: string;
    
    // Officer ID
    @Column({
        nullable: true
    })
    officer_id: string;
    
    // Meter No
    @Column({
        nullable: true
    })
    meter_no: string;
    
    // Vehicle License
    @Column({
        nullable: true
    })
    vehicle_license: string;
    
    // Vehicle VIN
    @Column({
        nullable: true
    })
    vehicle_vin: string;
    
    // Vehicle Body Type
    @Column({
        nullable: true
    })
    vehicle_body_type: string;
    
    // Expiration Date
    @Column({
        nullable: true
    })
    expiration_date: string;
    
    // Plate Color
    @Column({
        nullable: true
    })
    plate_color: string;
    
    // Plate Type
    @Column({
        nullable: true
    })
    plate_type: string;
    
    // Remarks
    @Column({
        nullable: true
    })
    remarks: string;
    
    // VOID
    @Column({
        default: false
    })
    void: boolean;
    
    // WARNINGS
    @Column({
        default: false
    })
    warning: boolean;
    
    // COMMENTS
    @Column({
        nullable: true
    })
    comments: string;
    
    // TIMESTAMP
    @Column({
        nullable: true
    })
    timestamp: string;  //Datetime
    
    // Vehicle State
    @ManyToOne(type => VehState, {eager: true})
    @JoinColumn({name: 'vehstate_id'})
    vehicle_state: VehState;
    
    // Vehicle Make
    @ManyToOne(type => VehMake,  {eager: true})
    @JoinColumn({name: 'vehmake_id'})
    vehicle_make: VehMake;
    
    // Vehicle Color
    @ManyToOne(type => VehColor, {eager: true})
    @JoinColumn({name: 'vehcolor_id'})
    vehicle_color: VehColor;
    
    // Location
    @ManyToOne(type => Location, {eager: true, cascade: true})
    @JoinColumn({name: 'location_id'})
    location: Location;
    
    // Violations
    @OneToMany(type => Violation, violation => violation.citation, {eager: true, cascade: true})
    violations: Violation[];
    
    // Attachments
    @OneToMany(type => Attachment, attachment => attachment.citation, {eager: true, cascade: true})
    attachments: Attachment[];

    // local property(none-submit prop)
    @Column()
    is_submitted: boolean = false;

    // local property(none-submit prop)
    @Column({
        nullable: true
    })
    icon: string;

    // local property(none-submit prop)
    @Column({
        nullable: true
    })
    icon_color: string;

    // local property(none-submit prop)
    @Column({
        default: false
    })
    is_visible: boolean;
}
