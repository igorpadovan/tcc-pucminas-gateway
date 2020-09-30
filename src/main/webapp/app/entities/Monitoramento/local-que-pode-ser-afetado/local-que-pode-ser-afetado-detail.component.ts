import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';

@Component({
  selector: 'jhi-local-que-pode-ser-afetado-detail',
  templateUrl: './local-que-pode-ser-afetado-detail.component.html',
})
export class LocalQuePodeSerAfetadoDetailComponent implements OnInit {
  localQuePodeSerAfetado: ILocalQuePodeSerAfetado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localQuePodeSerAfetado }) => (this.localQuePodeSerAfetado = localQuePodeSerAfetado));
  }

  previousState(): void {
    window.history.back();
  }
}
