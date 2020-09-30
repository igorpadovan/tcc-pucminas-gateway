import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAtivo } from 'app/shared/model/Ativo/ativo.model';

@Component({
  selector: 'jhi-ativo-detail',
  templateUrl: './ativo-detail.component.html',
})
export class AtivoDetailComponent implements OnInit {
  ativo: IAtivo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ativo }) => (this.ativo = ativo));
  }

  previousState(): void {
    window.history.back();
  }
}
