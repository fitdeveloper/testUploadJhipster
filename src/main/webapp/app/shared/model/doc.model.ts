import { IContent } from 'app/shared/model/content.model';
import { ICar } from 'app/shared/model/car.model';

export interface IDoc {
  id?: number;
  title?: string;
  size?: number;
  mimeType?: string;
  content?: IContent;
  car?: ICar;
}

export class Doc implements IDoc {
  constructor(
    public id?: number,
    public title?: string,
    public size?: number,
    public mimeType?: string,
    public content?: IContent,
    public car?: ICar
  ) {}
}
