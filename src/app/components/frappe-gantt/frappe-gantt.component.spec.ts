import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrappeGanttComponent } from './frappe-gantt.component';

describe('FrappeGanttComponent', () => {
  let component: FrappeGanttComponent;
  let fixture: ComponentFixture<FrappeGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrappeGanttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrappeGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
