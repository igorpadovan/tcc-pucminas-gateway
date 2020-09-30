import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAtivo, Ativo } from 'app/shared/model/Ativo/ativo.model';
import { AtivoService } from './ativo.service';
import { AtivoComponent } from './ativo.component';
import { AtivoDetailComponent } from './ativo-detail.component';
import { AtivoUpdateComponent } from './ativo-update.component';

@Injectable({ providedIn: 'root' })
export class AtivoResolve implements Resolve<IAtivo> {
  constructor(private service: AtivoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAtivo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ativo: HttpResponse<Ativo>) => {
          if (ativo.body) {
            return of(ativo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ativo());
  }
}

export const ativoRoute: Routes = [
  {
    path: '',
    component: AtivoComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Ativos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AtivoDetailComponent,
    resolve: {
      ativo: AtivoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ativos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AtivoUpdateComponent,
    resolve: {
      ativo: AtivoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ativos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AtivoUpdateComponent,
    resolve: {
      ativo: AtivoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ativos',
    },
    canActivate: [UserRouteAccessService],
  },
];
