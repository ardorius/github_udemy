import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    // console.log(form.value);
    console.log("isLoginMode: " + this.isLoginMode);
    if(form.valid){
      const email = form.value.email;
      const password = form.value.password;
      
      this.isLoading = true;

      if (this.isLoginMode){
        //..
      }
      else{
        this.authService.singUp(email, password).subscribe(
        responseData => {
          console.log(responseData);
          this.isLoading = false;
        },
        error => {
          console.log(error);          
          this.error = error.message;
          this.isLoading = false;
        });
      }

     

    }
    else return;
    form.reset();
  }
}
