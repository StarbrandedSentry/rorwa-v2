import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterResearchesComponent } from './center-researches.component';

describe('CenterResearchesComponent', () => {
  let component: CenterResearchesComponent;
  let fixture: ComponentFixture<CenterResearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterResearchesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterResearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
