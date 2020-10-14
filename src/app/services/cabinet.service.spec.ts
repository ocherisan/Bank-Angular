import { TestBed } from '@angular/core/testing';

import { CabinetService } from './cabinet.service';

describe('CabinetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabinetService = TestBed.get(CabinetService);
    expect(service).toBeTruthy();
  });
});
