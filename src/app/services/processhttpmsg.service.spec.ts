import { TestBed } from '@angular/core/testing';

import { ProcesshttpmsgService } from './processhttpmsg.service';

describe('ProcesshttpmsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesshttpmsgService = TestBed.get(ProcesshttpmsgService);
    expect(service).toBeTruthy();
  });
});
