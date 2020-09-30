import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AreaDeRiscoDetailComponent } from 'app/entities/Monitoramento/area-de-risco/area-de-risco-detail.component';
import { AreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';

describe('Component Tests', () => {
  describe('AreaDeRisco Management Detail Component', () => {
    let comp: AreaDeRiscoDetailComponent;
    let fixture: ComponentFixture<AreaDeRiscoDetailComponent>;
    const route = ({ data: of({ areaDeRisco: new AreaDeRisco(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AreaDeRiscoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AreaDeRiscoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AreaDeRiscoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load areaDeRisco on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.areaDeRisco).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
