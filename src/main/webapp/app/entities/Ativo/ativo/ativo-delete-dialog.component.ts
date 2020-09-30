import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAtivo } from 'app/shared/model/Ativo/ativo.model';
import { AtivoService } from './ativo.service';

@Component({
  templateUrl: './ativo-delete-dialog.component.html',
})
export class AtivoDeleteDialogComponent {
  ativo?: IAtivo;

  constructor(protected ativoService: AtivoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ativoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ativoListModification');
      this.activeModal.close();
    });
  }
}
