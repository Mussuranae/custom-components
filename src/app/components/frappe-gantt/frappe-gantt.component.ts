import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Gantt, { viewMode } from 'frappe-gantt';
import { tasks } from './data';
import { GanttExtended } from './gantt.model';


@Component({
  selector: 'app-frappe-gantt',
  templateUrl: './frappe-gantt.component.html',
  styleUrls: ['./frappe-gantt.component.scss']
})
export class FrappeGanttComponent implements OnInit {

  @ViewChild('dataTable') dataTable: ElementRef;

  gantt: GanttExtended;
  viewMode: viewMode;
  dataToDisplay: any[];
  tasks = tasks;
  startInit: Date;
  endInit: Date;

  constructor(private renderer: Renderer2) {}

  ngOnInit () {

    this.gantt = new GanttExtended('#gantt', this.tasks, {
      header_height: 50,
      column_width: 30,
      step: 20,
      view_modes: ['Day', 'Week', 'Month', 'Year'],
      bar_height: 20,
      bar_corner_radius: 3,
      arrow_curve: 5,
      padding: 18,
      view_mode: 'Day',
      language: 'fr',
      date_format: 'YYYY-MM-DD'
    });


    this.dataToDisplay = this.tasks.map(task => {
      return {
        name: task.name,
        start: task.start,
        end: task.end
      }
    })
    this.startInit = this.gantt.gantt_start!;
    this.endInit = this.gantt.gantt_end!;

    this.rangeUnit('Day');
  }

  ngAfterViewInit() {
    /** Use to insert the data table on the left of the Gantt chart, inside the SVG */
    const parent = document.getElementsByClassName('gantt-container');
    const svg = document.getElementById('gantt');
    this.renderer.insertBefore(parent[0], this.dataTable.nativeElement, svg);
    this.renderer.setStyle(parent[0], 'flex-direction', 'row');
    this.renderer.setStyle(parent[0], 'display', 'flex');
  }

  rangeUnit(event: viewMode) {
    this.gantt.change_view_mode(event);
  }

  /** Change date range with datepicker */
  getDateRange(event: any) {
    event.from ? this.gantt.gantt_start = event.from : this.gantt.gantt_start = this.startInit;
    event.to ? this.gantt.gantt_end = event.to : this.gantt.gantt_end = this.endInit;

    (<any>this.gantt).setup_date_values();
    (<any>this.gantt).render();
  }

  /** Zoom in or out in the Gantt chart */
  getZoom(event: string) {
    const mode = this.gantt.options.view_mode.toUpperCase();

    if (event === 'in') {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, 1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, -1, mode);
    } else {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, -1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, 1, mode);
    }
    (<any>this.gantt).setup_date_values();
    (<any>this.gantt).render();
  }

  /** Move to previous/next day/week/month */
  getMove(event: string) {
    const mode = this.gantt.options.view_mode.toUpperCase();

    if (event === 'previous') {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, -1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, -1, mode);
    } else {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, 1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, 1, mode);
    }

    (<any>this.gantt).setup_date_values();
    (<any>this.gantt).render();
  }

  /** Reset view with initial start and end gantt date */
  reset(event: boolean) {
    if (event) {
      this.gantt.gantt_start = this.startInit;
      this.gantt.gantt_end = this.endInit;
      (<any>this.gantt).setup_date_values();
      (<any>this.gantt).render();
    }
  }
}
