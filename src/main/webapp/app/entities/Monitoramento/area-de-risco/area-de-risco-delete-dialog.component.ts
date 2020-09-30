import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';
import { AreaDeRiscoService } from './area-de-risco.service';

@Component({
  templateUrl: './area-de-risco-delete-dialog.component.html',
})
export class AreaDeRiscoDeleteDialogComponent {
  areaDeRisco?: IAreaDeRisco;

  constructor(
    protected areaDeRiscoService: AreaDeRiscoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.areaDeRiscoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('areaDeRiscoListModification');
      this.activeModal.close();
    });
  }
}
