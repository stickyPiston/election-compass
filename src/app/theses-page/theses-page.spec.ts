import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesesPage } from './theses-page';

describe('ThesesPage', () => {
  let component: ThesesPage;
  let fixture: ComponentFixture<ThesesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ThesesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
