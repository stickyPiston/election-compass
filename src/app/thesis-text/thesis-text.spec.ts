import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisText } from './thesis-text';

describe('ThesisText', () => {
  let component: ThesisText;
  let fixture: ComponentFixture<ThesisText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisText],
    }).compileComponents();

    fixture = TestBed.createComponent(ThesisText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
