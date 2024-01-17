import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationLinkComponent } from './activation-link.component';

describe('ActivationLinkComponent', () => {
  let component: ActivationLinkComponent;
  let fixture: ComponentFixture<ActivationLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationLinkComponent]
    });
    fixture = TestBed.createComponent(ActivationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
