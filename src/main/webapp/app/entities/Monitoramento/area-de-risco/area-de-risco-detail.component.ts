import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';

@Component({
  selector: 'jhi-area-de-risco-detail',
  templateUrl: './area-de-risco-detail.component.html',
})
export class AreaDeRiscoDetailComponent implements OnInit {
  areaDeRisco: IAreaDeRisco | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areaDeRisco }) => (this.areaDeRisco = areaDeRisco));
  }

  previousState(): void {
    window.history.back();
  }
}
