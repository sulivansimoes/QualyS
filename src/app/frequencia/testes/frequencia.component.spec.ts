import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequenciaComponent } from '../componentes/frequencia.component';

describe('FrequenciaComponent', () => {
  let component: FrequenciaComponent;
  let fixture: ComponentFixture<FrequenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
