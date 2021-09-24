// import Gantt from '../../../../node_modules/frappe-gantt/src/index';
import Gantt from 'frappe-gantt';


export class GanttExtended extends Gantt {

  tasks: any[];
  options: any;
  gantt_start: Date | undefined;
  gantt_end: Date | undefined;
  private $svg: SVGElement;
  private bars: any[];
  _layers: any;

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


  /** Draw */
  // private render(): void {
  //   // clear svg
  //   this.$svg.innerHTML = '';
  //   this.bars.splice(0);

  //   // draw svg_layers
  //   this.setupLayer();

  //   // draw grid svg
  //   this.drawGrid();

  //   // draw date text and divide bar
  //   this.drawDateAndDivideBar();

  //   // create bar Object and draw SVG element
  //   this.drawGanttBars();
  // }

  // /** Create SVG layer */
  // private setupLayer(): void {
  //   this._layers = {};
  //   const layers = ['grid', 'date', 'arrow', 'progress', 'bar', 'details'];
  //   for (let layer of layers) {
  //     this._layers[layer] = this.createSVG('g', {
  //                                           class: layer,
  //                                           appendTo: this.$svg
  //                                         });
  //   }
  // }

  /** Dra Gantt Bars */
  // drawGanttBars(): void {
  //   // create taskBar object from task. and push it
  //   const createAndPushBar = (self: any, task: any) => {
  //     if (task.childTask) {
  //       task.childTask.forEach((t: any) => createAndPushBar(self, t));
  //     }
  //     const bar = new Bar(self, task);
  //     task.taskBar = bar;
  //     self._layers['bar'].appendChild(bar.$group);
  //     self.bars.push(bar);
  //   };

  //   this.tasks.forEach(task => createAndPushBar(this, task));
  // }

  // createSVG(tag: any, attrs: any) {
  //   const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
  //   for (let attr in attrs) {
  //     if (attr === 'appendTo') {
  //       attrs.appendTo.appendChild(elem);

  //     } else if (attr === 'innerHTML') {
  //       elem.innerHTML = attrs.innerHTML;

  //     } else {
  //       elem.setAttribute(attr, attrs[attr]);
  //     }
  //   }
  //   return elem;
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
