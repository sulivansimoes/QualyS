import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserCadastroFormularioComponent } from '../componentes/browser-cadastro-formulario.component';

describe('BrowserCadastroFormularioComponent', () => {
  let component: BrowserCadastroFormularioComponent;
  let fixture: ComponentFixture<BrowserCadastroFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserCadastroFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserCadastroFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
