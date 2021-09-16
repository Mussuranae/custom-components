/**
 * Minimum serie model for Highchart
 * https://api.highcharts.com/gantt/series.gantt.data
*/
export interface HighchartDataModel {
  color?: string,
  completed?: {
    amount: number
  },
  custom?: any,
  dependency?: string | any[],
  end: number,
  id: string,
  milestone?: boolean
  name: string,
  parent?: string,
  start: number,
}

/**
 * Minimum serie model for Highchart
 * https://api.highcharts.com/gantt/series.gantt.data
*/
export interface HighchartSerieModel {
  data: HighchartDataModel[],
  groupPadding: 0.1,
  name: string,
  pointPadding: 0,
  type: 'gantt',
}
