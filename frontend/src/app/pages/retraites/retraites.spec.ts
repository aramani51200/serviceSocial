import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Retraites } from './retraites';

describe('Retraites', () => {
  let component: Retraites;
  let fixture: ComponentFixture<Retraites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Retraites],
    }).compileComponents();

    fixture = TestBed.createComponent(Retraites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
