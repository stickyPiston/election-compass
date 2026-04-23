import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Thesis } from './thesis';

describe('Thesis', () => {
  let component: Thesis;
  let fixture: ComponentFixture<Thesis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Thesis],
    }).compileComponents();

    fixture = TestBed.createComponent(Thesis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
