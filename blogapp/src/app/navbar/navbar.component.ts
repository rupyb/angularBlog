import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerService } from '../service/server.service';
import { MatDialog } from '@angular/material';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() newUser = new EventEmitter();
  
  signedIn = false;
  selected = '';

  signUpInfo = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  signInInfo = {
    email: '',
    password: ''
  };

  error: String;

  constructor(private serverService: ServerService, public dialog: MatDialog) {

  }
  signIn() {
    this.serverService.get().pipe().subscribe(result => console.log(result), error => console.log('error'));
  }

  signUp() {

  }

  logOut() {
    this.newUser.emit({});
    this.serverService.currentUser = null;
    this.signedIn = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '250px',
      data: { ...this.signUpInfo,  error: this.error}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.error = '';
      this.signUpInfo = result;
      if (result.password && result.password !== result.passwordConfirm) {
        this.error = 'passwords do not match';
        return this.openDialog();
      }
      if (result) {

        this.serverService.post(this.signUpInfo).subscribe(theRes => console.log(theRes)
        );
      }
    });
  }

  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '250px',
      data: { ...this.signInInfo, error: this.error}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.error = '';
      this.signInInfo = result;
      if (result) {
        console.log(result);
        this.serverService.postSignIn(this.signInInfo).subscribe(theRes => {
          this.newUser.emit(theRes);
          this.signedIn = true;
        }
       );
      }
    });
  }
  serve() {
    this.serverService.post(this.signUpInfo).subscribe(res => console.log(res)
    );
  }
}
