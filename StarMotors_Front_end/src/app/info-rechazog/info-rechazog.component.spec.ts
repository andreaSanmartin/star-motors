import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRechazogComponent } from './info-rechazog.component';

describe('InfoRechazogComponent', () => {
  let component: InfoRechazogComponent;
  let fixture: ComponentFixture<InfoRechazogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRechazogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRechazogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
