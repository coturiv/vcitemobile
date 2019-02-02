import { Attachment } from './Attachment';
import { AttachmentType } from './AttachmentType';
import { Citation } from './Citation';
import { VehColor } from './VehColor';
import { VehMake } from './VehMake';
import { VehState } from './VehState';
import { Violation } from './Violation';

export class EntityFactory {

    public static getAllEntities() {
        return [
            Attachment,
            AttachmentType,
            Citation,
            VehColor,
            VehMake,
            VehState,
            Violation
        ];
    };

    public static getEntityByName(name: string) {
        return EntityFactory.getAllEntities().filter(ent => ent.name === name)[0];
    }
}

export {
    Citation,
    VehColor,
    VehMake,
    VehState,
    Violation
};