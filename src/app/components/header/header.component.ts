import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { viewMode } from 'frappe-gantt';
import { rangeUnits } from '../../model/config.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() rangeUnit = new EventEmitter<viewMode>();
  @Output() zoom = new EventEmitter<string>();
  @Output() move = new EventEmitter<string>();

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
  }

  sendZoom(param: 'in' | 'out') {
    this.zoom.emit(param);
  }
  sendMove(param: 'next' | 'previous') {
    this.move.emit(param);
  }

  resetView() {}

}
