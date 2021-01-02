import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TestUploadJhipsterSharedModule } from 'app/shared/shared.module';
import { TestUploadJhipsterCoreModule } from 'app/core/core.module';
import { TestUploadJhipsterAppRoutingModule } from './app-routing.module';
import { TestUploadJhipsterHomeModule } from './home/home.module';
import { TestUploadJhipsterEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TestUploadJhipsterSharedModule,
    TestUploadJhipsterCoreModule,
    TestUploadJhipsterHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TestUploadJhipsterEntityModule,
    TestUploadJhipsterAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class TestUploadJhipsterAppModule {}
