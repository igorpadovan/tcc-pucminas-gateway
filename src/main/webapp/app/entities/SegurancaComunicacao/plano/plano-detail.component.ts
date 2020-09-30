import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlano } from 'app/shared/model/SegurancaComunicacao/plano.model';

@Component({
  selector: 'jhi-plano-detail',
  templateUrl: './plano-detail.component.html',
})
export class PlanoDetailComponent implements OnInit {
  plano: IPlano | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plano }) => (this.plano = plano));
  }

  previousState(): void {
    window.history.back();
  }
}
