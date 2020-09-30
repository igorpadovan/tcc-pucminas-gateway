import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AtivoDetailComponent } from 'app/entities/Ativo/ativo/ativo-detail.component';
import { Ativo } from 'app/shared/model/Ativo/ativo.model';

describe('Component Tests', () => {
  describe('Ativo Management Detail Component', () => {
    let comp: AtivoDetailComponent;
    let fixture: ComponentFixture<AtivoDetailComponent>;
    const route = ({ data: of({ ativo: new Ativo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AtivoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AtivoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AtivoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ativo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ativo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
