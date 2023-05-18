import { TestBed } from '@angular/core/testing';

import { DatahijoService } from './datahijo.service';

describe('DatahijoService', () => {
  let service: DatahijoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatahijoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
