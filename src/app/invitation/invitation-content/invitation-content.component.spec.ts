import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationContentComponent } from './invitation-content.component';

describe('InvitationContentComponent', () => {
  let component: InvitationContentComponent;
  let fixture: ComponentFixture<InvitationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
