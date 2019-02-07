import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  currentUser;
  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get<any>('http://localhost:8080/stuff');
  }
  post(signUpData): Observable<any> {
    // const headers = new HttpHeaders()
    //       .set('Authorization', 'my-auth-token')
    //       .set('Content-Type', 'application/json');

    return this.httpClient.post<any>('http://localhost:8080/stuff', signUpData);
  }

  postSignIn(signInData): Observable<any> {
    this.currentUser = this.httpClient.post<any>('http://localhost:8080/signIn', signInData);
    return this.currentUser;
  }
}
// JSON.stringify(signUpData)