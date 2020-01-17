import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterEbookAddComponent } from './center-ebook-add.component';

describe('CenterEbookAddComponent', () => {
  let component: CenterEbookAddComponent;
  let fixture: ComponentFixture<CenterEbookAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CenterEbookAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterEbookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
