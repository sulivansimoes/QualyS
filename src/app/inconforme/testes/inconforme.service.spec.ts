import { TestBed } from '@angular/core/testing';

import { InconformeService } from '../model/inconforme.service';

describe('InconformeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InconformeService = TestBed.get(InconformeService);
    expect(service).toBeTruthy();
  });
});
