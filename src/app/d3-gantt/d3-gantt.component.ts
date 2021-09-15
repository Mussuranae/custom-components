import { Component } from '@angular/core';
import { IGanttData, IGanttConfig } from 'ng-d3-gantt';

/**
 * Testing the D3 Chart and ng-d3-gantt lib
 * https://www.npmjs.com/package/ng-d3-gantt
 */

@Component({
  selector: 'app-d3-gantt',
  templateUrl: './d3-gantt.component.html',
  styleUrls: ['./d3-gantt.component.scss']
})
export class D3GanttComponent {

  data: Array<IGanttData> = [
    {
      id: 1,
      title: 'Step 1 title that runneth over and over and over and over and over',
      start_date: '08/08/2012',
      end_date: '03/09/2020',
      subtitle: 'Short subtitle',
      // completion_percentage: 29,
      color: '#770051',
    },
    {
      id: 2,
      title: 'Step 2',
      start_date: '11/01/2018',
      end_date: '03/09/2019',
      subtitle: 'Short subtitle',
      completion_percentage: 29,
      color: '#05f20c',
    },
    {
      id: 3,
      title: 'Step 3',
      start_date: '04/15/2019',
      end_date: '06/14/2019',
      subtitle: 'Short subtitle',
      completion_percentage: 29,
      color: '#914ae1',
    },
    {
      id: 4,
      title: 'Step 4',
      start_date: '06/11/2019',
      end_date: '08/30/2019',
      subtitle: 'Short subtitle but with a lemon twist',
      completion_percentage: 29,
      color: '#b79d3b',
    },
    {
      id: 5,
      title: 'Step 5',
      start_date: '07/31/2019',
      end_date: '12/09/2019',
      subtitle: 'Short subtitle',
      completion_percentage: 29,
      // color: '#423db6',
    },
    {
      id: 6,
      title: 'test title',
      start_date: '03/01/2019',
      end_date: '03/15/2019',
      subtitle: 'get it out',
      color: 'purple'
    }
  ];

  cycles = [
    {
      id: 1,
      name: 'Q1',
      start_date: '01/01/2019',
      end_date: '03/31/2019',
    },
    {
      id: 2,
      name: 'Q2',
      start_date: '04/01/2019',
      end_date: '06/30/2019',
    },
    {
      id: 3,
      name: 'Q3',
      start_date: '07/01/2019',
      end_date: '9/30/2019',
    },
    {
      id: 3,
      name: 'Q4',
      start_date: '10/01/2019',
      end_date: '12/31/2019',
    }
  ];

  config: IGanttConfig = {
    dateFormat: 'MM/DD/YYYY',
    box_padding: 8, // Padding for the blocks in d3 units not pixels
    // metrics: {type: 'overall', years: [2016, 2018, 2019]}, // Type of gantt
    // metrics: {type: 'sprint', year: 2019, cycles: this.cycles}, // Type of gantt
    metrics: { type: 'fiscal', year: 2019, cycles: this.cycles },
    // metrics: {type: 'yearly', year: 2019}, // Type of gantt
    // metrics: {type: 'monthly', month: 'March 2019'}, // For Monthly Data
    // metrics: {type: 'quarterly', months: ['January 2019', 'February 2019', 'March 2019']}, // For quarterly or half yearly data
    isShowProgressBar: true,
    isShowGridlines: true,
    blockSpacing: 10,
    onClick: (data) => {
      console.log('onClick called on ', data );
    }
  };

}
