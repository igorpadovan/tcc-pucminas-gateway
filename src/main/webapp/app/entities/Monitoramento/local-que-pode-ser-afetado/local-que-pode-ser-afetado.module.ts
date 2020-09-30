import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { LocalQuePodeSerAfetadoComponent } from './local-que-pode-ser-afetado.component';
import { LocalQuePodeSerAfetadoDetailComponent } from './local-que-pode-ser-afetado-detail.component';
import { LocalQuePodeSerAfetadoUpdateComponent } from './local-que-pode-ser-afetado-update.component';
import { LocalQuePodeSerAfetadoDeleteDialogComponent } from './local-que-pode-ser-afetado-delete-dialog.component';
import { localQuePodeSerAfetadoRoute } from './local-que-pode-ser-afetado.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(localQuePodeSerAfetadoRoute)],
  declarations: [
    LocalQuePodeSerAfetadoComponent,
    LocalQuePodeSerAfetadoDetailComponent,
    LocalQuePodeSerAfetadoUpdateComponent,
    LocalQuePodeSerAfetadoDeleteDialogComponent,
  ],
  entryComponents: [LocalQuePodeSerAfetadoDeleteDialogComponent],
})
export class MonitoramentoLocalQuePodeSerAfetadoModule {}
