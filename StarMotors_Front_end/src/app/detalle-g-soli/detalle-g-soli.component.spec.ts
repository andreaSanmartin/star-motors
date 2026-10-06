import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGSoliComponent } from './detalle-g-soli.component';

describe('DetalleGSoliComponent', () => {
  let component: DetalleGSoliComponent;
  let fixture: ComponentFixture<DetalleGSoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleGSoliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGSoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
