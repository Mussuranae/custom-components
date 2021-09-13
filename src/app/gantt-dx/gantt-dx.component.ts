import { Component } from '@angular/core';
import { Task, Dependency, tasks, dependencies } from './gantt-data.model';

/**
 * Testing the Dev-Extreme lib for Gantt Chart
 * https://js.devexpress.com/Demos/WidgetsGallery/Demo/Gantt/Overview/Angular/Light/
 */

@Component({
  selector: 'app-gantt-dx',
  templateUrl: './gantt-dx.component.html',
  styleUrls: ['./gantt-dx.component.scss']
})
export class GanttDxComponent {

  tasks: Task[] = tasks;
  dependencies: Dependency[] = dependencies;

}
