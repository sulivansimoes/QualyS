import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaCadastroFormularioComponent } from '../../componentes/ajuda/ajuda-cadastro-formulario.component';

describe('AjudaCadastroFormularioComponent', () => {
  let component: AjudaCadastroFormularioComponent;
  let fixture: ComponentFixture<AjudaCadastroFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaCadastroFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaCadastroFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
