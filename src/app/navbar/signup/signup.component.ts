import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: String;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.error = data.error;
    }

  profileForm = this.fb.group({
    firstName: [this.data.firstName, Validators.required],
    lastName: [this.data.lastName],
    email: [this.data.email, Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  });


  ngOnInit() {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
