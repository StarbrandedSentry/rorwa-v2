import { TestBed } from '@angular/core/testing';

import { EbookService } from './ebook.service';

describe('EbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EbookService = TestBed.get(EbookService);
    expect(service).toBeTruthy();
  });
});
