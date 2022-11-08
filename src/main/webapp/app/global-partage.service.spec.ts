import { TestBed } from '@angular/core/testing';

import { GlobalPartageService } from './global-partage.service';

describe('GlobalPartageService', () => {
  let service: GlobalPartageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalPartageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
