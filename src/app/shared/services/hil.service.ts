import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Hil{
  machinename: string;
  labcarname: string;
  osversion: string;
  projectname: string;
  date: string;
}


@Injectable({
  providedIn: 'root',
})
export class HilService {
  
  constructor(private http: HttpClient) {}

  getHil(): Observable<Hil[]> {
    return this.http.get<Hil[]>(environment.apiUrl + '/hils');
  }
}
