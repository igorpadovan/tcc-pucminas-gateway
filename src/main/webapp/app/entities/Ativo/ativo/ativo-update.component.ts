import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAtivo, Ativo } from 'app/shared/model/Ativo/ativo.model';
import { AtivoService } from './ativo.service';

@Component({
  selector: 'jhi-ativo-update',
  templateUrl: './ativo-update.component.html',
})
export class AtivoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [],
    quantidade: [],
  });

  constructor(protected ativoService: AtivoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ativo }) => {
      this.updateForm(ativo);
    });
  }

  updateForm(ativo: IAtivo): void {
    this.editForm.patchValue({
      id: ativo.id,
      nome: ativo.nome,
      descricao: ativo.descricao,
      quantidade: ativo.quantidade,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ativo = this.createFromForm();
    if (ativo.id !== undefined) {
      this.subscribeToSaveResponse(this.ativoService.update(ativo));
    } else {
      this.subscribeToSaveResponse(this.ativoService.create(ativo));
    }
  }

  private createFromForm(): IAtivo {
    return {
      ...new Ativo(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      quantidade: this.editForm.get(['quantidade'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAtivo>>): void {
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
