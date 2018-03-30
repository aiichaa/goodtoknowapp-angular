import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { GTKService } from './gtk.service';

describe('GTKService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

        HttpClientModule
      ],
      providers: [GTKService]
    });
  });

  it('should be created', inject([GTKService], (service: GTKService) => {
    expect(service).toBeTruthy();
  }));
});
