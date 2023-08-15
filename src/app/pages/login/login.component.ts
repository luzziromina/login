import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { User } from 'src/app/class/user.class';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;
  public userDemo = new User("user@demo.com", "0303456");

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public verify(){
    if(this.loginForm.get('email').value === this.userDemo.email && this.loginForm.get('password').value ===  this.userDemo.password){
      this.openSnackBar("Sucessfull login :D", "sucess-snackbar");
    }else{
      this.openSnackBar("The credentials are not correct. Try again!", "failed-snackbar");
    }
  }

  private openSnackBar = (message: string, panelClass: string) =>{
    let config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = panelClass;
    this._snackBar.open(message, '', config);
  }


  private sucessSnackBar = () =>{
    let config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ['red-snackbar']
    this._snackBar.open("The credentials are not correct. Try again!", '', config);
  }
}
