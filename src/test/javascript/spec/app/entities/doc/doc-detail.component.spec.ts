import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestUploadJhipsterTestModule } from '../../../test.module';
import { DocDetailComponent } from 'app/entities/doc/doc-detail.component';
import { Doc } from 'app/shared/model/doc.model';

describe('Component Tests', () => {
  describe('Doc Management Detail Component', () => {
    let comp: DocDetailComponent;
    let fixture: ComponentFixture<DocDetailComponent>;
    const route = ({ data: of({ doc: new Doc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestUploadJhipsterTestModule],
        declarations: [DocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load doc on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
