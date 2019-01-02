import { TestBed } from '@angular/core/testing';

import { CadastroFormularioService } from './../model/cadastro-formulario.service';

describe('CadastroFormularioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroFormularioService = TestBed.get(CadastroFormularioService );
    expect(service).toBeTruthy();
  });
});
