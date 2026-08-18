import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mutuelle } from './mutuelle';

describe('Mutuelle', () => {
  let component: Mutuelle;
  let fixture: ComponentFixture<Mutuelle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mutuelle],
    }).compileComponents();

    fixture = TestBed.createComponent(Mutuelle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
