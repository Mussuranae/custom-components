import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3GanttComponent } from './components/d3-gantt/d3-gantt.component';
import { GanttChartComponent } from './components/gantt-chart/gantt-chart.component';
import { GanttDxComponent } from './components/gantt-dx/gantt-dx.component';
import { TranslationComponent } from './components/translation/translation.component';
import { FrappeGanttComponent } from './components/frappe-gantt/frappe-gantt.component';

const routes: Routes = [
  { path: 'translate', component: TranslationComponent },
  { path: 'highchart', component: GanttChartComponent },
  { path: 'dx', component: GanttDxComponent },
  { path: 'd3', component: D3GanttComponent },
  { path: 'frappe', component: FrappeGanttComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
