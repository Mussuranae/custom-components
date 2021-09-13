import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttDxComponent } from './gantt-dx.component';

describe('GanttDxComponent', () => {
  let component: GanttDxComponent;
  let fixture: ComponentFixture<GanttDxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttDxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttDxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
