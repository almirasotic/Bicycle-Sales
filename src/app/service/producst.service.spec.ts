/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProducstService } from './products.service';

describe('Service: Producst', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducstService]
    });
  });

  it('should ...', inject([ProducstService], (service: ProducstService) => {
    expect(service).toBeTruthy();
  }));
});
