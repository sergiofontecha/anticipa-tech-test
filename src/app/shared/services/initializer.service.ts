// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RxJS Methods
import { tap } from 'rxjs/internal/Operators/tap';

@Injectable()
export class InitializerService {
  public data: object;

  constructor(private httpClient: HttpClient) {}

  getProductsData(): Promise<object> {
    return this.httpClient
      .get(
        'https://apidev.holapisos.com/es/api/node/inmuebles?page[offset]=0&page[limit]=32'
      )
      .pipe(
        tap(data => {
          this.data = data;
        })
      )
      .toPromise();
  }
}
