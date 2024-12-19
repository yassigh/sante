import { TestBed } from '@angular/core/testing';

import { WaterIntakeService } from './water-intake.service';

describe('WaterIntakeService', () => {
  let service: WaterIntakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterIntakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
