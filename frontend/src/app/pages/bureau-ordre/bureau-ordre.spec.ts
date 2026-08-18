import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauOrdre } from './bureau-ordre';

describe('BureauOrdre', () => {
  let component: BureauOrdre;
  let fixture: ComponentFixture<BureauOrdre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BureauOrdre],
    }).compileComponents();

    fixture = TestBed.createComponent(BureauOrdre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
