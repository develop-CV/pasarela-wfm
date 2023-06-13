import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevafrecuenciacargaComponent } from './nuevafrecuenciacarga.component';

describe('NuevafrecuenciacargaComponent', () => {
  let component: NuevafrecuenciacargaComponent;
  let fixture: ComponentFixture<NuevafrecuenciacargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevafrecuenciacargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevafrecuenciacargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
