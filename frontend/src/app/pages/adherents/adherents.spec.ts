import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adherents } from './adherents';

describe('Adherents', () => {
  let component: Adherents;
  let fixture: ComponentFixture<Adherents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adherents],
    }).compileComponents();

    fixture = TestBed.createComponent(Adherents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
