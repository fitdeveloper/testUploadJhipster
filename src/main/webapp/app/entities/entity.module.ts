import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'car',
        loadChildren: () => import('./car/car.module').then(m => m.TestUploadJhipsterCarModule),
      },
      {
        path: 'doc',
        loadChildren: () => import('./doc/doc.module').then(m => m.TestUploadJhipsterDocModule),
      },
      {
        path: 'content',
        loadChildren: () => import('./content/content.module').then(m => m.TestUploadJhipsterContentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TestUploadJhipsterEntityModule {}
