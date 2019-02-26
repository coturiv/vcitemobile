import { Attachment } from './Attachment';
import { AttachmentType } from './AttachmentType';
import { Citation } from './Citation';
import { PlateType } from './PlateType';
import { VehColor } from './VehColor';
import { VehMake } from './VehMake';
import { VehState } from './VehState';
import { Violation } from './Violation';
import { Location } from './Location';

export class EntityFactory {

    public static getAllEntities() {
        return [
            Attachment,
            AttachmentType,
            Citation,
            PlateType,
            Location,
            VehColor,
            VehMake,
            VehState,
            Violation
        ];
    };

    public static getEntityByName(name: string) {
        return EntityFactory.getAllEntities().filter(ent => ent.name === name)[0];
    }

    public static getInstanceOfEntity(tableName: string) {
        switch(tableName.toLowerCase()) {
            case Attachment.name.toLowerCase():
                return new Attachment();
            case AttachmentType.name.toLowerCase():
                return new AttachmentType();
            case Citation.name.toLowerCase():
                return new Citation();
            case PlateType.name.toLowerCase():
                return new PlateType();
            case Location.name.toLowerCase():
                return new Location();
            case VehColor.name.toLowerCase():
                return new VehColor();
            case VehMake.name.toLowerCase():
                return new VehMake();
            case VehState.name.toLowerCase():
                return new VehState();
            case Violation.name.toLowerCase():
                return new Violation();
        }
    }
}

export {
    Attachment,
    AttachmentType,
    Citation,
    PlateType,
    Location,
    VehColor,
    VehMake,
    VehState,
    Violation
};