import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AreaDeRiscoUpdateComponent } from 'app/entities/Monitoramento/area-de-risco/area-de-risco-update.component';
import { AreaDeRiscoService } from 'app/entities/Monitoramento/area-de-risco/area-de-risco.service';
import { AreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';

describe('Component Tests', () => {
  describe('AreaDeRisco Management Update Component', () => {
    let comp: AreaDeRiscoUpdateComponent;
    let fixture: ComponentFixture<AreaDeRiscoUpdateComponent>;
    let service: AreaDeRiscoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AreaDeRiscoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AreaDeRiscoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AreaDeRiscoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AreaDeRiscoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AreaDeRisco(123);
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
        const entity = new AreaDeRisco();
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
