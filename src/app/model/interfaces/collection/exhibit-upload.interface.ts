import {Exhibit} from '../../implementations/exhibit.model';

export interface IExhibitUpload {
  artCollection: string;
  exhibits: Exhibit;
  files: File[];
}
