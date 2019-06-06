import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespostaFormularioComponent } from '../componentes/resposta-formulario.component';

describe('RespostaFormularioComponent', () => {
  let component: RespostaFormularioComponent;
  let fixture: ComponentFixture<RespostaFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespostaFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespostaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
