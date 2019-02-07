import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogserviceService {

  constructor(private httpClient: HttpClient) { }

  get() {
      return this.httpClient.get<any>('/blog');
  }

  post(blog) {
    return this.httpClient.post<any>('/blog', blog);
  }
}
