import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogapp';
  user = {};
  setUser(user) {
    if(user) {
      this.user = user[0];
    }
  }
}
