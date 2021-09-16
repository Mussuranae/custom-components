import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import DraggablePoints from 'highcharts/modules/draggable-points';
DraggablePoints(Highcharts);
import { fr_config, fr_custom_config } from '../../model/config.model';
import { HighchartDataModel, HighchartSerieModel } from '../../model/interface.model';
import series from '../../data/data.json';

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

  private jsonData = series;
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      //! Allow scrollable chart, title and legend stay fixed
      scrollablePlotArea: {
        minWidth: 400
      },
      type: 'gantt',
      height: 1,
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
          format: '{point.name}',
          style: {
            fontSize: '14px'
          },
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
        grid: {
          cellHeight: 30
        },
        labels: {
          padding: 4,
          style: {
            fontSize: '16px'
          }
        },
        // add min and max date to set a min and max date at the initialisation of the chart
        currentDateIndicator: {
          label: {
            format: '%a %e %b, %H:%M'
          }
        },
        dateTimeLabelFormats: {
          day: { list: ['%a %e %b', '%e %b', '%e']},
          week: fr_custom_config.weekFormat,
          month: { list: ['%B', '%b', '%o'] },
          year: { list: ['%Y'] }
        }
      },
      {
        grid: {
          cellHeight: 30
        },
        labels: {
          padding: 4,
          style: {
            fontSize: '16px'
          }
        },
        dateTimeLabelFormats: {
          day: { list: ['%a %e %b', '%e %b', '%e']},
          week: fr_custom_config.weekFormat,
          month: { list: ['%B', '%b', '%o'] },
          year: { list: ['%Y'] }
        }
      }
    ] as any, // if we want to avoid the 'any' type, we have to create our own type extending the option of xAxis
    yAxis: {
      labels: {
        align: 'left',
        levels: [
          {
            level: 1,
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
              // 'text-decoration': 'underline',
              // color: '#ff16dc'
            }
          },
          {
            level: 2,
            style: {
              fontSize: '13px',
              // color: '#ff9916'
            }
          }
        ]
      }
    },
    series: this.formatJsonSerie(this.jsonData.series)
  };

  ngOnInit() {
    // Set the language for label, button text, etc...
    this.Highcharts.setOptions(fr_config);
    this.updateGanttHeight();

    // Block parent's date with the first and last children's date
    this.updateParentStartDate();
  }

  formatJsonSerie(source: any): HighchartSerieModel[] {
    // Need to find a way to type correctly data that can be different
    const series = source.map((s: { name: any; data: any[]; })  => {
      const highchartSerie: HighchartSerieModel = {
        type: 'gantt',
        pointPadding: 0,
        groupPadding: 0.1,
        name: s.name,
        data: s.data.map((data: { [key: string]: string | number | any[]; }) => this.formatJsonData(data))
      };
      console.log('new series', highchartSerie);
      return highchartSerie;
    })
    return series;
  }

  formatJsonData(data: { [key: string]: any }) {
    const highchartData: HighchartDataModel = {
      end: data.end,
      id: data.id,
      name: data.name,
      start: data.start,
      parent: data.parent ?? '',
      dependency: data.dependency ?? '',
      milestone: data.milestone ?? false,
      completed: data.completed ?? null,
      custom: data.custom ?? null,
      color: data.parent ? '#61b7ff' : '#1bc027'
    }
    console.log('after format', highchartData)
    return highchartData;
  }

  /** Allow us to change the height of the row in chart */
  updateGanttHeight() {
    let chartHeight = 80 * this.jsonData.series[0].data.length;
    this.chartOptions.chart!.height = chartHeight;

  }

  updateParentStartDate() {
    // Récupérer chaque date enfant
    // Comparer et retenir uniquement la plus récente
    // Retourner la date retenue comme valeur parente
  }

  formatDataLabel(name: string, customColor: string) {
    return `<span style="color: white; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000">${name}</span>` +
    `<div class="circle-${customColor}"` +
    `style="height: 8px; width: 8px; background-color: ${customColor}; border-radius: 50px;"></div>`
  }
}
