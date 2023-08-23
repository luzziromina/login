import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user.class';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;
  public userDemo = new User("user@demo.com", "123");

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public verify(){
    if(this.loginForm.get('email').value === this.userDemo.email && this.loginForm.get('password').value ===  this.userDemo.password){
      this._authService.login().subscribe((result) => {
        if(result){
          this.openSnackBar("Sucessfull login :D", "sucess-snackbar");
          this.router.navigate(['/products']); 
        }
      });
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

}
