import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFormularioComponent } from '../componentes/cadastro-formulario.component';

describe('CadastroFormularioComponent', () => {
  let component: CadastroFormularioComponent;
  let fixture: ComponentFixture<CadastroFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
