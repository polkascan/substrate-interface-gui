import { TestBed } from '@angular/core/testing';

import { SubstrateApiService } from './substrate-api.service';

describe('SubstrateApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubstrateApiService = TestBed.get(SubstrateApiService);
    expect(service).toBeTruthy();
  });
});
