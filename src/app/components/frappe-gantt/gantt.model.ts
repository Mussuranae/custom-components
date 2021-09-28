// import Gantt from '../../../../node_modules/frappe-gantt/src/index';
import Gantt from 'frappe-gantt';

/**
 * ! try https://www.npmjs.com/package/ts-gantt
 * ? peut-être https://www.npmjs.com/package/gan2chart
 */

export class GanttExtended extends Gantt {

  tasks: any[];
  options: any;
  gantt_start: Date | undefined;
  gantt_end: Date | undefined;
  private $svg: SVGElement;
  private bars: any[];
  layers: any;
  dates: any[];

  DAY = 1000 * 60 * 60 * 24;
  public VIEW_MODE = {
    QUARTER_DAY: 'Quarter Day',
    HALF_DAY: 'Half Day',
    DAY: 'Day',
    WEEK: 'Week',
    MONTH: 'Month',
    YEAR: 'Year'
  };

  constructor(wrapper: string | HTMLElement | SVGElement, tasks: any[], options?: any) {
    super(wrapper, tasks, options)
    this.tasks = tasks;
    this.options = options;
    this.setup_gantt_dates();
  }

  /** Initialise Gantt start and end date */
  setup_gantt_dates = () => {
    this.gantt_start = this.gantt_end = undefined;

    for (let task of this.tasks) {
      // set global start and end date
      if (!this.gantt_start || task._start < this.gantt_start) {
        this.gantt_start = new Date(task._start - this.DAY*7);
      }
      if (!this.gantt_end || task._end > this.gantt_end) {
        this.gantt_end = new Date(task._end + this.DAY*7);
      }
    }

    this.gantt_start = this.start_of(this.gantt_start!, 'day');
    this.gantt_end = this.start_of(this.gantt_end!, 'day');

    // add date padding on both sides
    if (this.view_is(this.VIEW_MODE.MONTH)) {
      this.gantt_start = this.add(this.gantt_start, -10, 'DAY');
      this.gantt_end = this.add(this.gantt_end, 10, 'DAY');
    } else if (this.view_is(this.VIEW_MODE.YEAR)) {
      const year = this.gantt_start.getFullYear();
      this.gantt_start = new Date(year, 0, 1);
      this.gantt_end = new Date(year, 11, 31);
    } else {
      this.gantt_end = this.add(this.gantt_end, 7, 'DAY');
    }
  }

  /** Determine the view mode */
  view_is(modes: any) {
    if (typeof modes === 'string') {
      return this.options.view_mode === modes;
    }

    if (Array.isArray(modes)) {
      return modes.some(mode => this.options.view_mode === mode);
    }

    return false;
  }

  add(date: Date, qty: number, scale: string) {
    const week = scale === 'WEEK' ? date.getDate() + qty*7 : 0 ;
    const day = date.getDate() + (scale === 'DAY' ? qty : 0);

    const vals = [
      date.getFullYear() + (scale === 'YEAR' ? qty : 0),
      date.getMonth() + (scale === 'MONTH' ? qty : 0),
      scale === 'WEEK' ? week : day,
      date.getHours() + (scale === 'HOUR' ? qty : 0),
      date.getMinutes() + (scale === 'MINUTE' ? qty : 0),
      date.getSeconds() + (scale === 'SECOND' ? qty : 0),
      date.getMilliseconds() + (scale === 'MILLISECOND' ? qty : 0)
    ] as const;
    return new Date(...vals);
  };

  /** Define the width of the bars and the and the step between each date */
  update_view_scale = (view_mode: string) => {
    this.options.view_mode = view_mode;

    if (view_mode === this.VIEW_MODE.DAY) {
      this.options.step = 24;
      this.options.column_width = 30;
    } else if (view_mode === this.VIEW_MODE.WEEK) {
      this.options.step = 24 * 7;
      this.options.column_width = 140;
    } else if (view_mode === this.VIEW_MODE.MONTH) {
      this.options.step = 24 * 30;
      this.options.column_width = 400;
    } else if (view_mode === this.VIEW_MODE.YEAR) {
      this.options.step = 24 * 365;
      this.options.column_width = 500;
    }
  }

  private start_of(date: Date, scale: string) {
    const scores = {
      YEAR: 6,
      MONTH: 5,
      DAY: 4,
      HOUR: 3,
      MINUTE: 2,
      SECOND: 1,
      MILLISECOND: 0
    } as any;

    function should_reset(_scale: string) {
      const max_score = scores[scale];
      return scores[_scale] <= max_score;
    }

    const vals = [
      date.getFullYear(),
      should_reset('YEAR') ? 0 : date.getMonth(),
      should_reset('MONTH') ? 1 : date.getDate(),
      should_reset('DAY') ? 0 : date.getHours(),
      should_reset('HOUR') ? 0 : date.getMinutes(),
      should_reset('MINUTE') ? 0 : date.getSeconds(),
      should_reset('SECOND') ? 0 : date.getMilliseconds()
    ] as const;

    return new Date(...vals);
  }

  // render() {
  //   this.clear();
  //   this.setup_layers();
    // this.make_grid();
    // this.make_dates();
    // this.make_bars();
    // this.make_arrows();
    // this.map_arrows_on_bars();
    // this.set_width();
    // this.set_scroll_position();
  // }

  /** Clear all elements from the parent svg element */
  // clear() {
  //   this.$svg.innerHTML = '';
  // }

  // setup_layers() {
  //   this.layers = {};
  //   const layers = ['grid', 'date', 'arrow', 'progress', 'bar', 'details'];
  //   // make group layers
  //   for (let layer of layers) {
  //     this.layers[layer] = this.createSVG('g', {
  //       class: layer,
  //       append_to: this.$svg
  //     });
  //   }
  // }

  // createSVG(tag: any, attrs: any) {
  //   const elem = document.createElementNS('', tag);
  //   for (let attr in attrs) {
  //     if (attr === 'append_to') {
  //       const parent = attrs.append_to;
  //       parent.appendChild(elem);
  //     } else if (attr === 'innerHTML') {
  //       elem.innerHTML = attrs.innerHTML;
  //     } else {
  //       elem.setAttribute(attr, attrs[attr]);
  //     }
  //   }
  //   return elem;
  // }

  // make_dates() {
  //   for (let date of this.get_dates_to_draw()) {
  //     this.createSVG('text', {
  //       x: date.lower_x,
  //       y: date.lower_y,
  //       innerHTML: date.lower_text,
  //       class: 'lower-text',
  //       append_to: this.layers.date
  //     });

  //     if (date.upper_text) {
  //       const $upper_text = this.createSVG('text', {
  //         x: date.upper_x,
  //         y: date.upper_y,
  //         innerHTML: date.upper_text,
  //         class: 'upper-text',
  //         append_to: this.layers.date
  //       });

  //       // remove out-of-bound dates
  //       // if (
  //       //   $upper_text.getBBox().x2 > this.layers.grid.getBBox().width
  //       // ) {
  //       //   $upper_text.remove();
  //       // }
  //     }
  //   }
  // }

  // get_dates_to_draw() {
  //   let last_date: any = null;
  //   const dates = this.dates.map((date, i) => {
  //     const d = this.get_date_info(date, last_date, i);
  //     last_date = date;
  //     return d;
  //   });
  //   return dates;
  // }

  // get_date_info(date: any, last_date: any, i: any) {
  //   if (!last_date) {
  //       last_date = this.add(date, 1, 'year');
  //   }
  //   const date_text = {
  //       'Quarter Day_lower': this.format(
  //           date,
  //           'HH',
  //           this.options.language
  //       ),
  //       'Half Day_lower': this.format(
  //           date,
  //           'HH',
  //           this.options.language
  //       ),
  //       Day_lower:
  //           date.getDate() !== last_date.getDate()
  //               ? this.format(date, 'D', this.options.language)
  //               : '',
  //       Week_lower:
  //           date.getMonth() !== last_date.getMonth()
  //               ? this.format(date, 'D MMM', this.options.language)
  //               : this.format(date, 'D', this.options.language),
  //       Month_lower: this.format(date, 'MMMM', this.options.language),
  //       Year_lower: this.format(date, 'YYYY', this.options.language),
  //       'Quarter Day_upper':
  //           date.getDate() !== last_date.getDate()
  //               ? this.format(date, 'D MMM', this.options.language)
  //               : '',
  //       'Half Day_upper':
  //           date.getDate() !== last_date.getDate()
  //               ? date.getMonth() !== last_date.getMonth()
  //                 ? this.format(date, 'D MMM', this.options.language)
  //                 : this.format(date, 'D', this.options.language)
  //               : '',
  //       Day_upper:
  //           date.getMonth() !== last_date.getMonth()
  //               ? this.format(date, 'MMMM', this.options.language)
  //               : '',
  //       Week_upper:
  //           date.getMonth() !== last_date.getMonth()
  //               ? this.format(date, 'MMMM', this.options.language)
  //               : '',
  //       Month_upper:
  //           date.getFullYear() !== last_date.getFullYear()
  //               ? this.format(date, 'YYYY', this.options.language)
  //               : '',
  //       Year_upper:
  //           date.getFullYear() !== last_date.getFullYear()
  //               ? this.format(date, 'YYYY', this.options.language)
  //               : ''
  //   };

  //   const base_pos = {
  //       x: i * this.options.column_width,
  //       lower_y: this.options.header_height,
  //       upper_y: this.options.header_height - 25
  //   };

  //   const x_pos = {
  //       'Quarter Day_lower': this.options.column_width * 4 / 2,
  //       'Quarter Day_upper': 0,
  //       'Half Day_lower': this.options.column_width * 2 / 2,
  //       'Half Day_upper': 0,
  //       Day_lower: this.options.column_width / 2,
  //       Day_upper: this.options.column_width * 30 / 2,
  //       Week_lower: 0,
  //       Week_upper: this.options.column_width * 4 / 2,
  //       Month_lower: this.options.column_width / 2,
  //       Month_upper: this.options.column_width * 12 / 2,
  //       Year_lower: this.options.column_width / 2,
  //       Year_upper: this.options.column_width * 30 / 2
  //   };

  //   return {
  //       upper_text: date_text[`${this.options.view_mode}_upper`],
  //       lower_text: date_text[`${this.options.view_mode}_lower`],
  //       upper_x: base_pos.x + x_pos[`${this.options.view_mode}_upper`],
  //       upper_y: base_pos.upper_y,
  //       lower_x: base_pos.x + x_pos[`${this.options.view_mode}_lower`],
  //       lower_y: base_pos.lower_y
  //   };
  // }

  // format(date: any, format_string = 'YYYY-MM-DD HH:mm:ss.SSS', lang = 'en') {
  //   const values = this.get_date_values(date).map(d => this.padStart(d, 2, 0));
  //   const format_map = {
  //       YYYY: values[0],
  //       MM: this.padStart(+values[1] + 1, 2, 0),
  //       DD: values[2],
  //       HH: values[3],
  //       mm: values[4],
  //       ss: values[5],
  //       SSS:values[6],
  //       D: values[2],
  //       MMMM: month_names[lang][+values[1]],
  //       MMM: month_names[lang][+values[1]]
  //   };

  //   let str = format_string;
  //   const formatted_values: any[] = [];

  //   Object.keys(format_map)
  //       .sort((a, b) => b.length - a.length) // big string first
  //       .forEach(key => {
  //           if (str.includes(key)) {
  //               str = str.replace(key, `$${formatted_values.length}`);
  //               formatted_values.push(format_map[key]);
  //           }
  //       });

  //   formatted_values.forEach((value, i) => {
  //       str = str.replace(`$${i}`, value);
  //   });

  //   return str;
  // }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
//   padStart(str: string, targetLength: number, padString: any) {
//   str = str + '';
//   targetLength = targetLength >> 0;
//   padString = String(typeof padString !== 'undefined' ? padString : ' ');
//   if (str.length > targetLength) {
//       return String(str);
//   } else {
//       targetLength = targetLength - str.length;
//       if (targetLength > padString.length) {
//           padString += padString.repeat(targetLength / padString.length);
//       }
//       return padString.slice(0, targetLength) + String(str);
//   }
// }
}

/*

  * Gets the oldest starting date from the list of tasks
     *
     * @returns Date
     * @memberof Gantt

       get_oldest_starting_date() {
        return this.tasks
            .map(task => task._start)
            .reduce(
                (prev_date, cur_date) =>
                    cur_date <= prev_date ? cur_date : prev_date
            );
    }
  */
