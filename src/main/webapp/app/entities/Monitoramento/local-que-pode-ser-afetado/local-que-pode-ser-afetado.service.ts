import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';

type EntityResponseType = HttpResponse<ILocalQuePodeSerAfetado>;
type EntityArrayResponseType = HttpResponse<ILocalQuePodeSerAfetado[]>;

@Injectable({ providedIn: 'root' })
export class LocalQuePodeSerAfetadoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoramento/api/local-que-pode-ser-afetados';

  constructor(protected http: HttpClient) {}

  create(localQuePodeSerAfetado: ILocalQuePodeSerAfetado): Observable<EntityResponseType> {
    return this.http.post<ILocalQuePodeSerAfetado>(this.resourceUrl, localQuePodeSerAfetado, { observe: 'response' });
  }

  update(localQuePodeSerAfetado: ILocalQuePodeSerAfetado): Observable<EntityResponseType> {
    return this.http.put<ILocalQuePodeSerAfetado>(this.resourceUrl, localQuePodeSerAfetado, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalQuePodeSerAfetado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalQuePodeSerAfetado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
