import {IExhibitUpload} from '../interfaces/collection/exhibit-upload.interface';
import {Exhibit} from './exhibit.model';


export class ExhibitUpload implements IExhibitUpload {
  constructor(public artCollection: string, public exhibit: Exhibit,
              public file: string, public fileExtension: string) {}
}
