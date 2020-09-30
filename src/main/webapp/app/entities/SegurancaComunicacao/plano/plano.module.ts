import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PlanoComponent } from './plano.component';
import { PlanoDetailComponent } from './plano-detail.component';
import { PlanoUpdateComponent } from './plano-update.component';
import { PlanoDeleteDialogComponent } from './plano-delete-dialog.component';
import { planoRoute } from './plano.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(planoRoute)],
  declarations: [PlanoComponent, PlanoDetailComponent, PlanoUpdateComponent, PlanoDeleteDialogComponent],
  entryComponents: [PlanoDeleteDialogComponent],
})
export class SegurancaComunicacaoPlanoModule {}
