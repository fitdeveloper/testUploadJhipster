import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoc } from 'app/shared/model/doc.model';

@Component({
  selector: 'jhi-doc-detail',
  templateUrl: './doc-detail.component.html',
})
export class DocDetailComponent implements OnInit {
  doc: IDoc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doc }) => (this.doc = doc));
  }

  previousState(): void {
    window.history.back();
  }
}
