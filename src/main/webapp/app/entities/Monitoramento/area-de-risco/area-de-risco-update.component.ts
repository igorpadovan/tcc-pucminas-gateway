import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAreaDeRisco, AreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';
import { AreaDeRiscoService } from './area-de-risco.service';

@Component({
  selector: 'jhi-area-de-risco-update',
  templateUrl: './area-de-risco-update.component.html',
})
export class AreaDeRiscoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    local: [],
    tamanho: [],
  });

  constructor(protected areaDeRiscoService: AreaDeRiscoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areaDeRisco }) => {
      this.updateForm(areaDeRisco);
    });
  }

  updateForm(areaDeRisco: IAreaDeRisco): void {
    this.editForm.patchValue({
      id: areaDeRisco.id,
      nome: areaDeRisco.nome,
      local: areaDeRisco.local,
      tamanho: areaDeRisco.tamanho,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const areaDeRisco = this.createFromForm();
    if (areaDeRisco.id !== undefined) {
      this.subscribeToSaveResponse(this.areaDeRiscoService.update(areaDeRisco));
    } else {
      this.subscribeToSaveResponse(this.areaDeRiscoService.create(areaDeRisco));
    }
  }

  private createFromForm(): IAreaDeRisco {
    return {
      ...new AreaDeRisco(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      local: this.editForm.get(['local'])!.value,
      tamanho: this.editForm.get(['tamanho'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAreaDeRisco>>): void {
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
}
