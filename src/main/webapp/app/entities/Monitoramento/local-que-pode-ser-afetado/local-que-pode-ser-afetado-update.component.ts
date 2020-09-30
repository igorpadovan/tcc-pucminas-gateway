import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalQuePodeSerAfetado, LocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';
import { LocalQuePodeSerAfetadoService } from './local-que-pode-ser-afetado.service';
import { IAreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';
import { AreaDeRiscoService } from 'app/entities/Monitoramento/area-de-risco/area-de-risco.service';

@Component({
  selector: 'jhi-local-que-pode-ser-afetado-update',
  templateUrl: './local-que-pode-ser-afetado-update.component.html',
})
export class LocalQuePodeSerAfetadoUpdateComponent implements OnInit {
  isSaving = false;
  areaderiscos: IAreaDeRisco[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    areaDeRiscoId: [],
  });

  constructor(
    protected localQuePodeSerAfetadoService: LocalQuePodeSerAfetadoService,
    protected areaDeRiscoService: AreaDeRiscoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localQuePodeSerAfetado }) => {
      this.updateForm(localQuePodeSerAfetado);

      this.areaDeRiscoService.query().subscribe((res: HttpResponse<IAreaDeRisco[]>) => (this.areaderiscos = res.body || []));
    });
  }

  updateForm(localQuePodeSerAfetado: ILocalQuePodeSerAfetado): void {
    this.editForm.patchValue({
      id: localQuePodeSerAfetado.id,
      nome: localQuePodeSerAfetado.nome,
      areaDeRiscoId: localQuePodeSerAfetado.areaDeRiscoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localQuePodeSerAfetado = this.createFromForm();
    if (localQuePodeSerAfetado.id !== undefined) {
      this.subscribeToSaveResponse(this.localQuePodeSerAfetadoService.update(localQuePodeSerAfetado));
    } else {
      this.subscribeToSaveResponse(this.localQuePodeSerAfetadoService.create(localQuePodeSerAfetado));
    }
  }

  private createFromForm(): ILocalQuePodeSerAfetado {
    return {
      ...new LocalQuePodeSerAfetado(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      areaDeRiscoId: this.editForm.get(['areaDeRiscoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalQuePodeSerAfetado>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAreaDeRisco): any {
    return item.id;
  }
}
