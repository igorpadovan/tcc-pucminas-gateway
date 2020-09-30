import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { GatewayTestModule } from '../../../../test.module';
import { AreaDeRiscoComponent } from 'app/entities/Monitoramento/area-de-risco/area-de-risco.component';
import { AreaDeRiscoService } from 'app/entities/Monitoramento/area-de-risco/area-de-risco.service';
import { AreaDeRisco } from 'app/shared/model/Monitoramento/area-de-risco.model';

describe('Component Tests', () => {
  describe('AreaDeRisco Management Component', () => {
    let comp: AreaDeRiscoComponent;
    let fixture: ComponentFixture<AreaDeRiscoComponent>;
    let service: AreaDeRiscoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AreaDeRiscoComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(AreaDeRiscoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AreaDeRiscoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AreaDeRiscoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AreaDeRisco(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.areaDeRiscos && comp.areaDeRiscos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AreaDeRisco(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.areaDeRiscos && comp.areaDeRiscos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
