import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IDoc } from 'app/shared/model/doc.model';

type EntityResponseType = HttpResponse<IDoc>;
type EntityArrayResponseType = HttpResponse<IDoc[]>;

@Injectable({ providedIn: 'root' })
export class DocService {
  public resourceUrl = SERVER_API_URL + 'api/docs';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/docs';

  constructor(protected http: HttpClient) {}

  create(doc: IDoc): Observable<EntityResponseType> {
    return this.http.post<IDoc>(this.resourceUrl, doc, { observe: 'response' });
  }

  update(doc: IDoc): Observable<EntityResponseType> {
    return this.http.put<IDoc>(this.resourceUrl, doc, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDoc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDoc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDoc[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
