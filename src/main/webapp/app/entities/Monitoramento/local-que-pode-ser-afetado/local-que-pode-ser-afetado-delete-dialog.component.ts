import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';
import { LocalQuePodeSerAfetadoService } from './local-que-pode-ser-afetado.service';

@Component({
  templateUrl: './local-que-pode-ser-afetado-delete-dialog.component.html',
})
export class LocalQuePodeSerAfetadoDeleteDialogComponent {
  localQuePodeSerAfetado?: ILocalQuePodeSerAfetado;

  constructor(
    protected localQuePodeSerAfetadoService: LocalQuePodeSerAfetadoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.localQuePodeSerAfetadoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('localQuePodeSerAfetadoListModification');
      this.activeModal.close();
    });
  }
}
