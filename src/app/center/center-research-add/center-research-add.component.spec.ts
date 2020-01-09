import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterResearchAddComponent } from './center-research-add.component';

describe('CenterResearchAddComponent', () => {
  let component: CenterResearchAddComponent;
  let fixture: ComponentFixture<CenterResearchAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterResearchAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterResearchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
