import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaCadastroUsuarioComponent } from '../../componentes/ajuda/ajuda-cadastro-usuario.component';

describe('AjudaCadastroUsuarioComponent', () => {
  let component: AjudaCadastroUsuarioComponent;
  let fixture: ComponentFixture<AjudaCadastroUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaCadastroUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaCadastroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
