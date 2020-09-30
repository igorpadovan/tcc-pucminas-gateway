import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';

type EntityResponseType = HttpResponse<IAreaDeRisco>;
type EntityArrayResponseType = HttpResponse<IAreaDeRisco[]>;

@Injectable({ providedIn: 'root' })
export class AreaDeRiscoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoramento/api/area-de-riscos';

  constructor(protected http: HttpClient) {}

  create(areaDeRisco: IAreaDeRisco): Observable<EntityResponseType> {
    return this.http.post<IAreaDeRisco>(this.resourceUrl, areaDeRisco, { observe: 'response' });
  }

  update(areaDeRisco: IAreaDeRisco): Observable<EntityResponseType> {
    return this.http.put<IAreaDeRisco>(this.resourceUrl, areaDeRisco, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAreaDeRisco>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAreaDeRisco[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
