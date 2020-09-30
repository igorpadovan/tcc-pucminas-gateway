import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AreaDeRiscoComponent } from './area-de-risco.component';
import { AreaDeRiscoDetailComponent } from './area-de-risco-detail.component';
import { AreaDeRiscoUpdateComponent } from './area-de-risco-update.component';
import { AreaDeRiscoDeleteDialogComponent } from './area-de-risco-delete-dialog.component';
import { areaDeRiscoRoute } from './area-de-risco.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(areaDeRiscoRoute)],
  declarations: [AreaDeRiscoComponent, AreaDeRiscoDetailComponent, AreaDeRiscoUpdateComponent, AreaDeRiscoDeleteDialogComponent],
  entryComponents: [AreaDeRiscoDeleteDialogComponent],
})
export class MonitoramentoAreaDeRiscoModule {}
