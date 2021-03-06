import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PlatformModule } from '@angular/cdk/platform';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-import.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Highcharts and HightChat-Angular
import { HighchartsChartModule } from 'highcharts-angular';

// DX Gantt Chart
import { DxButtonModule } from 'devextreme-angular';
import { DxGanttModule } from 'devextreme-angular';

//D3 and Ng-D3-Gantt lib
import { NgD3GanttModule } from 'ng-d3-gantt';

// Components
import { AppComponent } from './app.component';
import { InformativeBannerComponent } from './components/informative-banner/informative-banner.component';
import { GanttChartComponent } from './components/gantt-chart/gantt-chart.component';
import { TranslationComponent } from './components/translation/translation.component';
import { GanttDxComponent } from './components/gantt-dx/gantt-dx.component';
import { D3GanttComponent } from './components/d3-gantt/d3-gantt.component';
import { FrappeGanttComponent } from './components/frappe-gantt/frappe-gantt.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    InformativeBannerComponent,
    GanttChartComponent,
    TranslationComponent,
    GanttDxComponent,
    D3GanttComponent,
    FrappeGanttComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlatformModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HighchartsChartModule,
    NgD3GanttModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    // DX import
    DxButtonModule,
    DxGanttModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation (Ahead of Time)
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
