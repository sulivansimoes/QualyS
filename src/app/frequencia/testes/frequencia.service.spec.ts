import { TestBed } from '@angular/core/testing';

import { FrequenciaService } from '../Model/frequencia.service';

describe('FrequenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrequenciaService = TestBed.get(FrequenciaService);
    expect(service).toBeTruthy();
  });
});
