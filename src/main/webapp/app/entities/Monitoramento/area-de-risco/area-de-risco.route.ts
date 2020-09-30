import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAreaDeRisco, AreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';
import { AreaDeRiscoService } from './area-de-risco.service';
import { AreaDeRiscoComponent } from './area-de-risco.component';
import { AreaDeRiscoDetailComponent } from './area-de-risco-detail.component';
import { AreaDeRiscoUpdateComponent } from './area-de-risco-update.component';

@Injectable({ providedIn: 'root' })
export class AreaDeRiscoResolve implements Resolve<IAreaDeRisco> {
  constructor(private service: AreaDeRiscoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAreaDeRisco> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((areaDeRisco: HttpResponse<AreaDeRisco>) => {
          if (areaDeRisco.body) {
            return of(areaDeRisco.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AreaDeRisco());
  }
}

export const areaDeRiscoRoute: Routes = [
  {
    path: '',
    component: AreaDeRiscoComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'AreaDeRiscos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AreaDeRiscoDetailComponent,
    resolve: {
      areaDeRisco: AreaDeRiscoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AreaDeRiscos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AreaDeRiscoUpdateComponent,
    resolve: {
      areaDeRisco: AreaDeRiscoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AreaDeRiscos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AreaDeRiscoUpdateComponent,
    resolve: {
      areaDeRisco: AreaDeRiscoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AreaDeRiscos',
    },
    canActivate: [UserRouteAccessService],
  },
];
