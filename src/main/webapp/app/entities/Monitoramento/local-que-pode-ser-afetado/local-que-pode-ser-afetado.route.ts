import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocalQuePodeSerAfetado, LocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';
import { LocalQuePodeSerAfetadoService } from './local-que-pode-ser-afetado.service';
import { LocalQuePodeSerAfetadoComponent } from './local-que-pode-ser-afetado.component';
import { LocalQuePodeSerAfetadoDetailComponent } from './local-que-pode-ser-afetado-detail.component';
import { LocalQuePodeSerAfetadoUpdateComponent } from './local-que-pode-ser-afetado-update.component';

@Injectable({ providedIn: 'root' })
export class LocalQuePodeSerAfetadoResolve implements Resolve<ILocalQuePodeSerAfetado> {
  constructor(private service: LocalQuePodeSerAfetadoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocalQuePodeSerAfetado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((localQuePodeSerAfetado: HttpResponse<LocalQuePodeSerAfetado>) => {
          if (localQuePodeSerAfetado.body) {
            return of(localQuePodeSerAfetado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocalQuePodeSerAfetado());
  }
}

export const localQuePodeSerAfetadoRoute: Routes = [
  {
    path: '',
    component: LocalQuePodeSerAfetadoComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'LocalQuePodeSerAfetados',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocalQuePodeSerAfetadoDetailComponent,
    resolve: {
      localQuePodeSerAfetado: LocalQuePodeSerAfetadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LocalQuePodeSerAfetados',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocalQuePodeSerAfetadoUpdateComponent,
    resolve: {
      localQuePodeSerAfetado: LocalQuePodeSerAfetadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LocalQuePodeSerAfetados',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocalQuePodeSerAfetadoUpdateComponent,
    resolve: {
      localQuePodeSerAfetado: LocalQuePodeSerAfetadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LocalQuePodeSerAfetados',
    },
    canActivate: [UserRouteAccessService],
  },
];
