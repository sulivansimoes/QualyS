import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaRespostaFormularioComponent } from '../../componentes/ajuda/ajuda-resposta-formulario.component';

describe('AjudaRespostaFormularioComponent', () => {
  let component: AjudaRespostaFormularioComponent;
  let fixture: ComponentFixture<AjudaRespostaFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaRespostaFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaRespostaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
