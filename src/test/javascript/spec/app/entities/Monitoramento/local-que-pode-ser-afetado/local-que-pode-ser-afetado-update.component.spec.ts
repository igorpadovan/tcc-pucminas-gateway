import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LocalQuePodeSerAfetadoUpdateComponent } from 'app/entities/Monitoramento/local-que-pode-ser-afetado/local-que-pode-ser-afetado-update.component';
import { LocalQuePodeSerAfetadoService } from 'app/entities/Monitoramento/local-que-pode-ser-afetado/local-que-pode-ser-afetado.service';
import { LocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';

describe('Component Tests', () => {
  describe('LocalQuePodeSerAfetado Management Update Component', () => {
    let comp: LocalQuePodeSerAfetadoUpdateComponent;
    let fixture: ComponentFixture<LocalQuePodeSerAfetadoUpdateComponent>;
    let service: LocalQuePodeSerAfetadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LocalQuePodeSerAfetadoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalQuePodeSerAfetadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalQuePodeSerAfetadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalQuePodeSerAfetadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalQuePodeSerAfetado(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalQuePodeSerAfetado();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
