import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3GanttComponent } from './d3-gantt/d3-gantt.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { GanttDxComponent } from './gantt-dx/gantt-dx.component';
import { TranslationComponent } from './translation/translation.component';

const routes: Routes = [
  { path: 'translate', component: TranslationComponent },
  { path: 'highchart', component: GanttChartComponent },
  { path: 'dx', component: GanttDxComponent },
  { path: 'd3', component: D3GanttComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
