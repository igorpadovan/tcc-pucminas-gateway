import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalQuePodeSerAfetado } from 'app/shared/model/Monitoramento/local-que-pode-ser-afetado.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { LocalQuePodeSerAfetadoService } from './local-que-pode-ser-afetado.service';
import { LocalQuePodeSerAfetadoDeleteDialogComponent } from './local-que-pode-ser-afetado-delete-dialog.component';

@Component({
  selector: 'jhi-local-que-pode-ser-afetado',
  templateUrl: './local-que-pode-ser-afetado.component.html',
})
export class LocalQuePodeSerAfetadoComponent implements OnInit, OnDestroy {
  localQuePodeSerAfetados?: ILocalQuePodeSerAfetado[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected localQuePodeSerAfetadoService: LocalQuePodeSerAfetadoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.localQuePodeSerAfetadoService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ILocalQuePodeSerAfetado[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInLocalQuePodeSerAfetados();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocalQuePodeSerAfetado): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocalQuePodeSerAfetados(): void {
    this.eventSubscriber = this.eventManager.subscribe('localQuePodeSerAfetadoListModification', () => this.loadPage());
  }

  delete(localQuePodeSerAfetado: ILocalQuePodeSerAfetado): void {
    const modalRef = this.modalService.open(LocalQuePodeSerAfetadoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localQuePodeSerAfetado = localQuePodeSerAfetado;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ILocalQuePodeSerAfetado[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/local-que-pode-ser-afetado'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.localQuePodeSerAfetados = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
