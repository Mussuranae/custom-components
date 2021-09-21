import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import DraggablePoints from 'highcharts/modules/draggable-points';
DraggablePoints(Highcharts);
import { fr_config, xAxisConfig, yAxisConfig, chartConfig, plotOptionsConfig, tooltipConfig, rangeUnits } from '../../model/config.model';
import { HighchartDataModel, HighchartSerieModel } from '../../model/interface.model';
import series from '../../data/data.json';
import { FormControl, FormGroup } from '@angular/forms';


/**
 * Testing Highchart library for Gantt Chart
 * https://www.highcharts.com/products/gantt/
 */

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit, AfterViewInit {

  private jsonData = series;
  rangeUnits = rangeUnits;
  Highcharts: typeof Highcharts = Highcharts;
  DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  initialMin = 0;
  initialMax = 0;

  chartOptions: Highcharts.Options = {
    chart: chartConfig,
    plotOptions: plotOptionsConfig,
    scrollbar: {
      enabled: true
    },
    title: {
      text: "Gantt Chart"
    },
    tooltip: tooltipConfig,
    xAxis: xAxisConfig,
    yAxis: yAxisConfig as any,
    series: this.formatJsonSerie(this.jsonData.series)
  };

  rangeForm = new FormGroup({
    from: new FormControl({ value: '', disabled: true }),
    to: new FormControl({ value: '', disabled: true })
  })
  rangeUnitForm = new FormControl('month');

  ngOnInit() {

    // Set the language for label, button text, etc...
    this.Highcharts.setOptions(fr_config);
    this.updateGanttHeight();

    this.updateDateRange();
  }

  ngAfterViewInit() {
    this.initialMin = this.Highcharts.charts[0]?.xAxis[0].min!;
    this.initialMax = this.Highcharts.charts[0]?.xAxis[0].max!;
  }

  /** Allow us to change the height of rows in chart */
  updateGanttHeight() {
    let chartHeight = 80 * this.jsonData.series[0].data.length;
    this.chartOptions.chart!.height = chartHeight;
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
    return highchartData;
  }

  updateDateRange() {
    this.rangeForm.valueChanges.subscribe(values => {
      const min = this.Highcharts.charts[0]?.xAxis[0].min!;
      const max = this.Highcharts.charts[0]?.xAxis[0].max!;
      const valueFrom = values.from ? Date.parse(values.from) : min;
      const valueTo = values.to ? Date.parse(values.to) : max;
      this.Highcharts.charts[0]?.xAxis[0].setExtremes(valueFrom, valueTo)
    })
  }

  zoom(param: 'in' | 'out') {
    const unit = this.rangeUnitForm.value;
    const min = this.Highcharts.charts[0]?.xAxis[0].min!;
    const max = this.Highcharts.charts[0]?.xAxis[0].max!;

    console.log('min', min);
    console.log('max', max);

    if (param === 'in') {
      switch(unit) {
        case "hours":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS/2), max-(this.DAY_IN_MILLISECONDS/2));
          break;
        case "day":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS), max-(this.DAY_IN_MILLISECONDS));
          break;
        case "week":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS*7), max-(this.DAY_IN_MILLISECONDS*7));
          break;
        case "month":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS*30), max-(this.DAY_IN_MILLISECONDS*30));
          break;
        case "year":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS*365), max-(this.DAY_IN_MILLISECONDS*365));
          break;
      }
    } else if (param === 'out') {
      switch(unit) {
        case "hours":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS/2), max+(this.DAY_IN_MILLISECONDS/2));
          break;
        case "day":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS), max+(this.DAY_IN_MILLISECONDS));
          break;
        case "week":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS*7), max+(this.DAY_IN_MILLISECONDS*7));
          break;
        case "month":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS*30), max+(this.DAY_IN_MILLISECONDS*30));
          break;
        case "year":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS*365), max+(this.DAY_IN_MILLISECONDS*365));
          break;
      }
    }
  }

  move(param: 'previous' | 'next') {
    const unit = this.rangeUnitForm.value;
    const min = this.Highcharts.charts[0]?.xAxis[0].min!;
    const max = this.Highcharts.charts[0]?.xAxis[0].max!;

    if(param === 'previous') {
      switch(unit) {
        case "hours":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS/2), max-(this.DAY_IN_MILLISECONDS/2));
          break;
        case "day":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS), max-(this.DAY_IN_MILLISECONDS));
          break;
        case "week":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS*7), max-(this.DAY_IN_MILLISECONDS*7));
          break;
        case "month":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS*30), max-(this.DAY_IN_MILLISECONDS*30));
          break;
        case "year":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min-(this.DAY_IN_MILLISECONDS*365), max-(this.DAY_IN_MILLISECONDS*365));
          break;
      }
    } else if (param === 'next') {
      switch(unit) {
        case "hours":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS/2), max+(this.DAY_IN_MILLISECONDS/2));
          break;
        case "day":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS), max+(this.DAY_IN_MILLISECONDS));
          break;
        case "week":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS*7), max+(this.DAY_IN_MILLISECONDS*7));
          break;
        case "month":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS*30), max+(this.DAY_IN_MILLISECONDS*30));
          break;
        case "year":
          this.Highcharts.charts[0]?.xAxis[0].setExtremes(min+(this.DAY_IN_MILLISECONDS*365), max+(this.DAY_IN_MILLISECONDS*365));
          break;
      }
    }
  }

  resetView() {
    this.Highcharts.charts[0]?.xAxis[0].setExtremes(this.initialMin, this.initialMax)
  }

  // formatDataLabel(name: string, customColor: string) {
  //   return `<span style="color: white; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000">${name}</span>` +
  //   `<div class="circle-${customColor}"` +
  //   `style="height: 8px; width: 8px; background-color: ${customColor}; border-radius: 50px;"></div>`
  // }
}
