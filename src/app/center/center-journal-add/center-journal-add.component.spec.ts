import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterJournalAddComponent } from './center-journal-add.component';

describe('CenterJournalAddComponent', () => {
  let component: CenterJournalAddComponent;
  let fixture: ComponentFixture<CenterJournalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterJournalAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterJournalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
