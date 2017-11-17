import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartModalDemoComponent } from './chart-modal-demo.component';

describe('ChartModalDemoComponent', () => {
  let component: ChartModalDemoComponent;
  let fixture: ComponentFixture<ChartModalDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartModalDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartModalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
