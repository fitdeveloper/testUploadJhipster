import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDoc, Doc } from 'app/shared/model/doc.model';
import { DocService } from './doc.service';
import { IContent } from 'app/shared/model/content.model';
import { ContentService } from 'app/entities/content/content.service';
import { ICar } from 'app/shared/model/car.model';
import { CarService } from 'app/entities/car/car.service';

type SelectableEntity = IContent | ICar;

@Component({
  selector: 'jhi-doc-update',
  templateUrl: './doc-update.component.html',
})
export class DocUpdateComponent implements OnInit {
  isSaving = false;
  contents: IContent[] = [];
  cars: ICar[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    size: [null, [Validators.required]],
    mimeType: [],
    content: [],
    car: [null, Validators.required],
  });

  constructor(
    protected docService: DocService,
    protected contentService: ContentService,
    protected carService: CarService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doc }) => {
      this.updateForm(doc);

      this.contentService
        .query({ filter: 'doc-is-null' })
        .pipe(
          map((res: HttpResponse<IContent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContent[]) => {
          if (!doc.content || !doc.content.id) {
            this.contents = resBody;
          } else {
            this.contentService
              .find(doc.content.id)
              .pipe(
                map((subRes: HttpResponse<IContent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContent[]) => (this.contents = concatRes));
          }
        });

      this.carService.query().subscribe((res: HttpResponse<ICar[]>) => (this.cars = res.body || []));
    });
  }

  updateForm(doc: IDoc): void {
    this.editForm.patchValue({
      id: doc.id,
      title: doc.title,
      size: doc.size,
      mimeType: doc.mimeType,
      content: doc.content,
      car: doc.car,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doc = this.createFromForm();
    if (doc.id !== undefined) {
      this.subscribeToSaveResponse(this.docService.update(doc));
    } else {
      this.subscribeToSaveResponse(this.docService.create(doc));
    }
  }

  private createFromForm(): IDoc {
    return {
      ...new Doc(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      size: this.editForm.get(['size'])!.value,
      mimeType: this.editForm.get(['mimeType'])!.value,
      content: this.editForm.get(['content'])!.value,
      car: this.editForm.get(['car'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoc>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
