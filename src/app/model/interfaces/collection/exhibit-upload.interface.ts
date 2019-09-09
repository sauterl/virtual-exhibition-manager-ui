import {IExhibit} from '../objects/exhibit.interface';

export interface IExhibitUpload {
  artCollection: string;
  exhibit: IExhibit;
  file: string;
  fileExtension: string;
}
