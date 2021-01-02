import { IDoc } from 'app/shared/model/doc.model';

export interface ICar {
  id?: number;
  model?: string;
  docs?: IDoc[];
}

export class Car implements ICar {
  constructor(public id?: number, public model?: string, public docs?: IDoc[]) {}
}
