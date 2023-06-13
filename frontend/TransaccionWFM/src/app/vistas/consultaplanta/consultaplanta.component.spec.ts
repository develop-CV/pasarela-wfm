import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaplantaComponent } from './consultaplanta.component';

describe('ConsultaplantaComponent', () => {
  let component: ConsultaplantaComponent;
  let fixture: ComponentFixture<ConsultaplantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaplantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaplantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
