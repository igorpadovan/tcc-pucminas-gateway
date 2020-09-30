import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAtivo } from 'app/shared/model/Ativo/ativo.model';

type EntityResponseType = HttpResponse<IAtivo>;
type EntityArrayResponseType = HttpResponse<IAtivo[]>;

@Injectable({ providedIn: 'root' })
export class AtivoService {
  public resourceUrl = SERVER_API_URL + 'services/ativo/api/ativos';

  constructor(protected http: HttpClient) {}

  create(ativo: IAtivo): Observable<EntityResponseType> {
    return this.http.post<IAtivo>(this.resourceUrl, ativo, { observe: 'response' });
  }

  update(ativo: IAtivo): Observable<EntityResponseType> {
    return this.http.put<IAtivo>(this.resourceUrl, ativo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAtivo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAtivo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
