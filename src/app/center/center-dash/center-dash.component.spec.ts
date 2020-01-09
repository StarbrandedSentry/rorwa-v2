import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterDashComponent } from './center-dash.component';

describe('CenterDashComponent', () => {
  let component: CenterDashComponent;
  let fixture: ComponentFixture<CenterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterDashComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
