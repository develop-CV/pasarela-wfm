import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaplantaComponent } from './cargaplanta.component';

describe('CargaplantaComponent', () => {
  let component: CargaplantaComponent;
  let fixture: ComponentFixture<CargaplantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaplantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaplantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
