import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3GanttComponent } from './d3-gantt.component';

describe('D3GanttComponent', () => {
  let component: D3GanttComponent;
  let fixture: ComponentFixture<D3GanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3GanttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3GanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
