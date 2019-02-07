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
    return this.httpClient.get<any>('/stuff');
  }
  post(signUpData): Observable<any> {
    // const headers = new HttpHeaders()
    //       .set('Authorization', 'my-auth-token')
    //       .set('Content-Type', 'application/json');

    return this.httpClient.post<any>('/stuff', signUpData);
  }

  postSignIn(signInData): Observable<any> {
    this.currentUser = this.httpClient.post<any>('/signIn', signInData);
    return this.currentUser;
  }
}
// JSON.stringify(signUpData)