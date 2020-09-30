import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalQuePodeSerAfetadoService } from 'app/entities/Monitoramento/local-que-pode-ser-afetado/local-que-pode-ser-afetado.service';
import { ILocalQuePodeSerAfetado, LocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';

describe('Service Tests', () => {
  describe('LocalQuePodeSerAfetado Service', () => {
    let injector: TestBed;
    let service: LocalQuePodeSerAfetadoService;
    let httpMock: HttpTestingController;
    let elemDefault: ILocalQuePodeSerAfetado;
    let expectedResult: ILocalQuePodeSerAfetado | ILocalQuePodeSerAfetado[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LocalQuePodeSerAfetadoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new LocalQuePodeSerAfetado(0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LocalQuePodeSerAfetado', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LocalQuePodeSerAfetado()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LocalQuePodeSerAfetado', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LocalQuePodeSerAfetado', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a LocalQuePodeSerAfetado', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
