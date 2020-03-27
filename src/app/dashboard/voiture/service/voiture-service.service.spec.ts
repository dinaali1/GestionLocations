import { TestBed } from '@angular/core/testing';

import { VoitureServiceService } from './voiture-service.service';

describe('VoitureServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoitureServiceService = TestBed.get(VoitureServiceService);
    expect(service).toBeTruthy();
  });
});
