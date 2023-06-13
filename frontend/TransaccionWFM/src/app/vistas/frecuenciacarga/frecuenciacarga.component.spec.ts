import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrecuenciacargaComponent } from './frecuenciacarga.component';

describe('FrecuenciacargaComponent', () => {
  let component: FrecuenciacargaComponent;
  let fixture: ComponentFixture<FrecuenciacargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrecuenciacargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrecuenciacargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
