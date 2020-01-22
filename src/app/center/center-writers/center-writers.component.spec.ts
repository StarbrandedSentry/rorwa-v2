import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterWritersComponent } from './center-writers.component';

describe('CenterWritersComponent', () => {
  let component: CenterWritersComponent;
  let fixture: ComponentFixture<CenterWritersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterWritersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterWritersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
