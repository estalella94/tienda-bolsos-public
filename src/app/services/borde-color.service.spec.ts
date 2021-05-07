import { TestBed } from '@angular/core/testing';

import { BordeColorService } from './borde-color.service';

describe('BordeColorService', () => {
  let service: BordeColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BordeColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
