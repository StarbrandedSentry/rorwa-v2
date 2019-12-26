import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminNavComponent } from './sadmin-nav.component';

describe('SadminNavComponent', () => {
  let component: SadminNavComponent;
  let fixture: ComponentFixture<SadminNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SadminNavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
