import { TestBed } from '@angular/core/testing';

import { InternalGuard } from './internal.guard';

describe('InternalGuard', () => {
  let guard: InternalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InternalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
