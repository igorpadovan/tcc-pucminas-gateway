import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ativo',
        loadChildren: () => import('./Ativo/ativo/ativo.module').then(m => m.AtivoAtivoModule),
      },
      {
        path: 'area-de-risco',
        loadChildren: () => import('./Monitoramento/area-de-risco/area-de-risco.module').then(m => m.MonitoramentoAreaDeRiscoModule),
      },
      {
        path: 'local-que-pode-ser-afetado',
        loadChildren: () =>
          import('./Monitoramento/local-que-pode-ser-afetado/local-que-pode-ser-afetado.module').then(
            m => m.MonitoramentoLocalQuePodeSerAfetadoModule
          ),
      },
      {
        path: 'plano',
        loadChildren: () => import('./SegurancaComunicacao/plano/plano.module').then(m => m.SegurancaComunicacaoPlanoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
