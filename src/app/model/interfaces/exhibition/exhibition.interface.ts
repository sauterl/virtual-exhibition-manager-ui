import {IRoom} from '../room/room.interface';
import {ObjectId} from './objectid.interface';

export interface IExhibition {
    id: ObjectId;
    name: string;
    key: string;
    description: string;
    rooms: IRoom[];
}
