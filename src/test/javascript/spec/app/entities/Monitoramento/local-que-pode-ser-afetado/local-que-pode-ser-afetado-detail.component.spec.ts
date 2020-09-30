import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LocalQuePodeSerAfetadoDetailComponent } from 'app/entities/Monitoramento/local-que-pode-ser-afetado/local-que-pode-ser-afetado-detail.component';
import { LocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';

describe('Component Tests', () => {
  describe('LocalQuePodeSerAfetado Management Detail Component', () => {
    let comp: LocalQuePodeSerAfetadoDetailComponent;
    let fixture: ComponentFixture<LocalQuePodeSerAfetadoDetailComponent>;
    const route = ({ data: of({ localQuePodeSerAfetado: new LocalQuePodeSerAfetado(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LocalQuePodeSerAfetadoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalQuePodeSerAfetadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalQuePodeSerAfetadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localQuePodeSerAfetado on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localQuePodeSerAfetado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
