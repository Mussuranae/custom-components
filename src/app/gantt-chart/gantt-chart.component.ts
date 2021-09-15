import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import DraggablePoints from 'highcharts/modules/draggable-points';
DraggablePoints(Highcharts);
import { fr_config, fr_custom_config } from './gantt-data.model';

/**
 * Testing Highchart library for Gantt Chart
 * https://www.highcharts.com/products/gantt/
 */

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {
  DAY: number = 24 * 3600 * 1000;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      //! Allow scrollable chart, title and legend stay fixed
      scrollablePlotArea: {
        minWidth: 400
      }
    },
    plotOptions: {
      gantt: {
        dragDrop: {
          draggableX: true,
          draggableY: true,
          dragMinY: 0,
          dragMaxY: 2,
        },
        dataLabels: {
          enabled: true,
          align: 'left',
          format: '{point.name}'
        }
      }
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,
      buttonSpacing: 10,
      buttons: [
        {
          type: 'week',
          text: 'Week',
          title: 'Week',
          count: 1,
        },
        {
          type: 'month',
          text: 'Month',
          title: 'Month',
          count: 1,
        },
        {
          type: 'month',
          text: '3M',
          title: 'Quarter',
          count: 3,
        },
        {
          type: 'year',
          text: 'Year',
          title: 'Year',
          count: 1,
        },
      ]
    },
    scrollbar: {
      enabled: true
    },
    title: {
      text: "Gantt Chart"
    },
    tooltip: {
      xDateFormat: '%b %d, %H:%M',
      followPointer: true
    },
    xAxis: [
      {
        // add min and max date to set a min and max date at the initialisation of the chart
        currentDateIndicator: true,
        dateTimeLabelFormats: {
          day: { list: ['%a %e %b', '%e %b', '%e']},
          week: fr_custom_config.weekFormat,
          month: { list: ['%B', '%b', '%o'] },
          year: { list: ['%Y'] }
        }
      },
      {
        dateTimeLabelFormats: {
          day: { list: ['%a %e %b', '%e %b', '%e']},
          week: fr_custom_config.weekFormat,
          month: { list: ['%B', '%b', '%o'] },
          year: { list: ['%Y'] }
        }
      }
    ] as any, // if we want to avoid the any type, we have to create our own type extending the option of xAxis
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
        data: [
          {
            name: 'Coucou',
            id: 'coucou',
            start: Date.UTC(2021, 3, 7),
            end: Date.UTC(2021, 3, 10)
          },
          // First section
          {
            name: "Start prototype",
            id: 'prototype',
            start: Date.UTC(2021, 9, 1),
            end: Date.UTC(2021, 9, 25),
            completed: {
              amount: 0.2
            }
          },
          {
            name: 'Alpha',
            id: 'alpha',
            start: Date.UTC(2021, 9, 2),
            end: Date.UTC(2021, 9, 10),
            parent: 'prototype',
            completed: {
              amount: 0.7
            }
          },
          {
            name: 'Beta',
            id: 'beta',
            start: Date.UTC(2021, 9, 11),
            end: Date.UTC(2021, 9, 17),
            parent: 'prototype',
            dependency: 'alpha',
          },
          {
            name: 'Omega',
            id: 'omega',
            start: Date.UTC(2021, 9, 20),
            end: Date.UTC(2021, 9, 25),
            parent: 'prototype',
            dependency: 'beta',
          },
          // Second section
          {
            name: "Test prototype",
            start: Date.UTC(2021, 9, 27),
            end: Date.UTC(2021, 9, 31),
          },
          // Third section
          {
            name: "Develop",
            id: 'develop',
            start: Date.UTC(2021, 9, 28),
            end: Date.UTC(2021, 10, 20)
          },
          // Last section
          {
            name: "Run acceptance tests",
            start: Date.UTC(2021, 10, 20),
            end: Date.UTC(2021, 10, 29)
          }
        ]
      },
      {
        type: 'gantt',
        name: 'Project 2',
        data: [
          {
            name: 'Start Development',
            id: 'dev',
            start: Date.UTC(2021, 9, 1),
            end: Date.UTC(2021, 9, 25),
            completed: {
              amount: 0.2
            }
          },
          {
            name: 'Phase 1',
            id: 'ph1',
            start: Date.UTC(2021, 9, 2),
            end: Date.UTC(2021, 9, 10),
            parent: 'dev',
            completed: {
              amount: 0.7
            }
          },
          {
            name: 'Phase 2',
            id: 'ph2',
            start: Date.UTC(2021, 9, 11),
            end: Date.UTC(2021, 9, 17),
            parent: 'dev',
            dependency: 'ph1',
          },
          {
            name: 'Test',
            id: 'test',
            start: Date.UTC(2021, 9, 20),
            end: Date.UTC(2021, 9, 25),
            parent: 'dev',
            dependency: 'ph2',
          },
        ]

      }
    ]
  };

  ngOnInit() {
    this.updateParentStartDate();
    // Set the language for label, button text, etc...
    this.Highcharts.setOptions(fr_config);
  }

  updateParentStartDate() {
    // Récupérer chaque date enfant
    console.log(this.chartOptions)
    // Comparer et retenir uniquement la plus récente
    // Retourner la date retenue comme valeur parente
  }
}
