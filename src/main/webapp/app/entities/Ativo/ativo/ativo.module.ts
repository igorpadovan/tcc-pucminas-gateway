import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AtivoComponent } from './ativo.component';
import { AtivoDetailComponent } from './ativo-detail.component';
import { AtivoUpdateComponent } from './ativo-update.component';
import { AtivoDeleteDialogComponent } from './ativo-delete-dialog.component';
import { ativoRoute } from './ativo.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ativoRoute)],
  declarations: [AtivoComponent, AtivoDetailComponent, AtivoUpdateComponent, AtivoDeleteDialogComponent],
  entryComponents: [AtivoDeleteDialogComponent],
})
export class AtivoAtivoModule {}
