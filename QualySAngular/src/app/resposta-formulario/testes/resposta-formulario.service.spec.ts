import { TestBed } from '@angular/core/testing';

import { RespostaFormularioService } from '../model/resposta-formulario.service';

describe('RespostaFormularioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespostaFormularioService = TestBed.get(RespostaFormularioService);
    expect(service).toBeTruthy();
  });
});
