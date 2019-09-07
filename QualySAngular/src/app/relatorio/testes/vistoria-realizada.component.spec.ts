import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistoriaRealizadaComponent } from './../componentes/vistoria-realizada.component';

describe('VistoriaRealizadaComponent', () => {
  let component: VistoriaRealizadaComponent;
  let fixture: ComponentFixture<VistoriaRealizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistoriaRealizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistoriaRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
