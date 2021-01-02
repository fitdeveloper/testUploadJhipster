import { IDoc } from 'app/shared/model/doc.model';

export interface IContent {
  id?: number;
  dataContentType?: string;
  data?: any;
  doc?: IDoc;
}

export class Content implements IContent {
  constructor(public id?: number, public dataContentType?: string, public data?: any, public doc?: IDoc) {}
}
