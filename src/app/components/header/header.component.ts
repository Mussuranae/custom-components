import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { viewMode } from 'frappe-gantt';
import { rangeUnits } from '../../model/config.model';

interface DateRange {
  from: Date,
  to: Date
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() dateRange = new EventEmitter<DateRange>();
  @Output() move = new EventEmitter<string>();
  @Output() zoom = new EventEmitter<string>();
  @Output() rangeUnit = new EventEmitter<viewMode>();
  @Output() reset = new EventEmitter<boolean>();

  rangeUnits = rangeUnits;
  rangeForm = new FormGroup({
    from: new FormControl({ value: '', disabled: true }),
    to: new FormControl({ value: '', disabled: true })
  })
  rangeUnitForm = new FormControl('Day');

  constructor() { }

  ngOnInit(): void {
    this.rangeUnitForm.valueChanges.subscribe(value => {
      this.rangeUnit.emit(value);
    })

    this.sendRangeDate();
  }

  sendRangeDate() {
    this.rangeForm.valueChanges.subscribe(values => {
      const dateRange: DateRange = {
        from: values.from,
        to: values.to
      }
      this.dateRange.emit(dateRange);
    })
  }

  sendZoom(param: 'in' | 'out') {
    this.zoom.emit(param);
  }
  sendMove(param: 'next' | 'previous') {
    this.move.emit(param);
  }

  resetView() {
    this.reset.emit(true);
  }

}
