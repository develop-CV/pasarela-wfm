import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesandoComponent } from './procesando.component';

describe('ProcesandoComponent', () => {
  let component: ProcesandoComponent;
  let fixture: ComponentFixture<ProcesandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesandoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
