import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;

  constructor(
    private authService : AuthService, 
    private router: Router,
    private viewContainerRef: ViewContainerRef
    // private componentFactoryResolver: ComponentFactoryResolver//deprecated
    ) { }

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
      
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;

      if (this.isLoginMode){
        //..
        authObs = this.authService.login(email, password);
      }
      else{
        authObs = this.authService.singUp(email, password);
      }

      authObs.subscribe(//share and reduce code
        responseData => {
          console.log(responseData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorMessage => {
          console.log(errorMessage);         
         
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        });
     

    }
    else return;
    form.reset();
  }

  OnHandleError(){
    this.error = null;
    
  }

  private showErrorAlert(message: string){
    // const alertComp = new AlertComponent(); will not work, not work at action with DOM
    // const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(//deprecated v13
    //   AlertComponent
    // );
    const alertCmpFactory = this.viewContainerRef.createComponent(AlertComponent);
  }
}
