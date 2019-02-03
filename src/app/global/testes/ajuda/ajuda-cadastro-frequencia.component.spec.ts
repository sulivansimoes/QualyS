import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaCadastroFrequenciaComponent } from '../../componentes/ajuda/ajuda-cadastro-frequencia.component';

describe('AjudaCadastroFrequenciaComponent', () => {
  let component: AjudaCadastroFrequenciaComponent;
  let fixture: ComponentFixture<AjudaCadastroFrequenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaCadastroFrequenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaCadastroFrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
