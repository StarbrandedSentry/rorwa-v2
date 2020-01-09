import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAdminsComponent } from './center-admins.component';

describe('CenterAdminsComponent', () => {
  let component: CenterAdminsComponent;
  let fixture: ComponentFixture<CenterAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterAdminsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
