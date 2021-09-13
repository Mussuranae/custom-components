import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import DraggablePoints from 'highcharts/modules/draggable-points';
DraggablePoints(Highcharts);

/**
 * Testing Highchart library for Gantt Chart
 * https://www.highcharts.com/products/gantt/
 *
 * + Responsive
 */

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: "Gantt Chart with Progress Indicators"
    },
    xAxis: {
      min: Date.UTC(2014, 9, 30),
      max: Date.UTC(2014, 11, 30)
    },
    chart: {
      //! Allow scrollable chart, title and legend stay fixed
      scrollablePlotArea: {
        minWidth: 400
      }
    },
    plotOptions: {
      series: {
        dragDrop: {
          draggableX: true,
          draggableY: true,
          dragMinY: 0,
          dragMaxY: 2,
        },
      }
    },
    yAxis: {
      /*
      * To be able to drag and drop vertically, the type must be different from 'Treegrid',
      * which is the default one for Gantt charts. This is not required if we don't change the type.
      */
      type: 'treegrid',
      categories: ['Prototype', 'Test Prototype', 'Develop', 'Run acceptance tests'],
      min: 0,
  },
    series: [
      {
        type: "gantt",
        name: "Project 1",
        grouping: true,
        data: [
          // First section
          {
            name: "Start prototype",
            id: 'prototype',
            start: Date.UTC(2014, 10, 1),
            end: Date.UTC(2014, 10, 25),
          },
          {
            name: 'Alpha',
            id: 'alpha',
            start: Date.UTC(2014, 10, 2),
            end: Date.UTC(2014, 10, 10),
            parent: 'prototype',
          },
          {
            name: 'Beta',
            id: 'beta',
            start: Date.UTC(2014, 10, 11),
            end: Date.UTC(2014, 10, 17),
            parent: 'prototype',
            dependency: 'alpha',
          },
          {
            name: 'Omega',
            id: 'omega',
            start: Date.UTC(2014, 10, 20),
            end: Date.UTC(2014, 10, 25),
            parent: 'prototype',
            dependency: 'beta',
          },
          // Second section
          {
            name: "Test prototype",
            start: Date.UTC(2014, 10, 27),
            end: Date.UTC(2014, 10, 31),
          },
          // Third section
          {
            name: "Develop",
            id: 'develop',
            start: Date.UTC(2014, 10, 28),
            end: Date.UTC(2014, 11, 20)
          },
          // Last section
          {
            name: "Run acceptance tests",
            start: Date.UTC(2014, 11, 20),
            end: Date.UTC(2014, 11, 29)
          }
        ]
      }
    ]
  };

}
