import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoc } from 'app/shared/model/doc.model';
import { DocService } from './doc.service';
import { DocDeleteDialogComponent } from './doc-delete-dialog.component';

@Component({
  selector: 'jhi-doc',
  templateUrl: './doc.component.html',
})
export class DocComponent implements OnInit, OnDestroy {
  docs?: IDoc[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected docService: DocService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.docService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IDoc[]>) => (this.docs = res.body || []));
      return;
    }

    this.docService.query().subscribe((res: HttpResponse<IDoc[]>) => (this.docs = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocs(): void {
    this.eventSubscriber = this.eventManager.subscribe('docListModification', () => this.loadAll());
  }

  delete(doc: IDoc): void {
    const modalRef = this.modalService.open(DocDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doc = doc;
  }
}
