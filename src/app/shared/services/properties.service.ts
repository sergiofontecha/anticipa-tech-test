// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PropertiesService {
  constructor(private httpClient: HttpClient) {}

  getProperties(link: string): Observable<object> {
    return this.httpClient.get(link);
  }
}
