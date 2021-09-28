/**
 * All config and custom config depending on language
 * https://api.highcharts.com/gantt/lang
 */

export const fr_config = {
  lang: {
    loading: 'Chargement en cours...',
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    shortMonths: ['Janv', 'Févr', 'Mar', 'Avr', 'Mai', 'Juin', 'Juill', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
    shortWeekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  }
}

export const en_config = {
  loading: 'Loading...',
  months: [['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']],
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

export const fr_custom_config = {
  weekFormat: { list: ['Semaine %W', 'S%W'] }
}

export const en_custom_config = {
  weekFormat: { list: ['Week %W', 'W%W'] }
}

export const chartConfig = {
  //! Allow scrollable chart, title and legend stay fixed
  scrollablePlotArea: {
    minWidth: 400
  },
  type: 'gantt',
  height: 1,
};

export const plotOptionsConfig = {
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
};

export const rangeSelectorConfig = {
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
};

export const tooltipConfig = {
  xDateFormat: '%b %d, %H:%M',
  followPointer: true
};

export const yAxisConfig = [
  {
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
  }
];

export const xAxisConfig = [
  {
    // add min and max date to set a min and max date at the initialisation of the chart
    grid: {
      cellHeight: 30
    },
    labels: {
      padding: 4,
      style: {
        fontSize: '16px'
      }
    },
    currentDateIndicator: {
      label: {
        format: '%a %e %b, %H:%M'
      }
    },
    dateTimeLabelFormats: {
      day: { list: ['%a %e %b', '%e %b', '%e']},
      week: fr_custom_config.weekFormat,
      month: { list: ['%B %Y', '%b %Y', '%B %y', '%b %y'] },
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
      month: { list: ['%B %Y', '%b %Y', '%B %y', '%b %y'] },
      year: { list: ['%Y'] }
    }
  }
] as any; // if we want to avoid the 'any' type, we have to create our own type extending the option of xAxis

// export const rangeUnits = [
//   { value: 'hour', label: 'Hour', count: 1 },
//   { value: 'day', label: 'Day', count: 1 },
//   { value: 'week', label: 'Week', count: 1 },
//   { value: 'month', label: 'Month', count: 1 },
//   { value: 'year', label: 'Year', count: 1 },
// ]

export const rangeUnits = ['Day', 'Week', 'Month', 'Year'];
