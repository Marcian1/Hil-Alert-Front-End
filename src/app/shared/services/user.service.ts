import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Hil } from './hil.service';
export interface User {
  id: number;
  username: string;
  password: string;
  password_confirm: string;
  email: string;
  hils: Hil[];
  properties: string[];
  token: string
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {

  public authSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.authSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('alert_user'))
    );
  }

  public get getAuthValue(): User {
    return this.authSubject.value;
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/login', user).pipe(
      map((authResponse: User) => {
        if (authResponse) {
          localStorage.setItem('alert_user', JSON.stringify((authResponse[0])));
          localStorage.setItem('token', JSON.stringify((authResponse['token'])));
          const user = JSON.parse(localStorage.getItem('alert_user'));
          const hils =  user.hils;
          const properties = user.properties;
          localStorage.setItem(
            'hils',
            JSON.stringify(hils.map((x) => x.labcarname))
          );
          localStorage.setItem(
            'properties',
            JSON.stringify(properties.map((x) => x.name))
          );
          
          this.authSubject.next(authResponse);
          return authResponse;
        }
      })
    );
  }
  register(user) {
    console.log('service',user)
    return this.http.post<User>(environment.apiUrl + '/register', user);
  }
  reset(user) {
    console.log('reset',user)
    return this.http.post<User>(environment.apiUrl + '/reset', user);
  }
  forgot(user) {
    console.log('forgot',user)
    return this.http.post<User>(environment.apiUrl + '/forgot', user);
  }

  sendHils(username, hils: Array<number>): Observable<any> {
    return this.http.patch<any>(environment.apiUrl + '/users/' + username, { hils });
  }

  sendProperties(username, properties: Array<number>): Observable<any> {
    return this.http.patch<any>(environment.apiUrl + '/users/' + username, { properties });
  }

  logout(): void {
    localStorage.removeItem('alert_user');
    localStorage.removeItem('hils');
    localStorage.removeItem('properties');
    this.router.navigate(['/']);
    if (this.router.url === '/') {
    window.location.reload();
    }
  }
}
