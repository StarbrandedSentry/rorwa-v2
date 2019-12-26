import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminDashComponent } from './sadmin-dash.component';

describe('SadminDashComponent', () => {
  let component: SadminDashComponent;
  let fixture: ComponentFixture<SadminDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SadminDashComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
