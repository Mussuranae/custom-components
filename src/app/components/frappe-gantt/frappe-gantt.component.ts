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

    this.rangeUnit('Day');
  }

  ngAfterViewInit() {
    const parent = document.getElementsByClassName('gantt-container');
    const svg = document.getElementById('gantt');
    this.renderer.insertBefore(parent[0], this.dataTable.nativeElement, svg);
    this.renderer.setStyle(parent[0], 'flex-direction', 'row');
    this.renderer.setStyle(parent[0], 'display', 'flex');
  }

  rangeUnit(event: viewMode) {
    this.gantt.change_view_mode(event);
  }

  getZoom(event: string) {
    console.log('zoom', event);
    const mode = this.gantt.options.view_mode.toUpperCase();

    if (event === 'in') {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, 1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, -1, mode);
      console.log('in start', this.gantt.gantt_start)
      console.log('in end', this.gantt.gantt_end)

      // date updated but didn't update the view
    } else {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, -1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, 1, mode);
      console.log('out start', this.gantt.gantt_start)
      console.log('out end', this.gantt.gantt_end)
    }

  }

  getMove(event: string) {
    const mode = this.gantt.options.view_mode.toUpperCase();

    if (event === 'previous') {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, -1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, -1, mode);
      console.log('previous', this.gantt.gantt_start)

      // date updated but didn't update the view
    } else {
      this.gantt.gantt_start = this.gantt.add(this.gantt.gantt_start!, 1, mode);
      this.gantt.gantt_end = this.gantt.add(this.gantt.gantt_end!, 1, mode);
      console.log('next', this.gantt.gantt_start)
    }
  }
}


// in source code, look at "setup_gantt_dates()",  "gantt_end", "gantt_start" (l.224 index.js), setup_gantt_dates() (l.1234)
