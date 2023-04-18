import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuppalComponent } from './menuppal.component';

describe('MenuppalComponent', () => {
  let component: MenuppalComponent;
  let fixture: ComponentFixture<MenuppalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuppalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuppalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
