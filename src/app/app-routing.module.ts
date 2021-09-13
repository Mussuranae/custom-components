import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { GanttDxComponent } from './gantt-dx/gantt-dx.component';
import { TranslationComponent } from './translation/translation.component';

const routes: Routes = [
  { path: 'translate', component: TranslationComponent },
  { path: 'highchart', component: GanttChartComponent },
  { path: 'dx', component: GanttDxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
