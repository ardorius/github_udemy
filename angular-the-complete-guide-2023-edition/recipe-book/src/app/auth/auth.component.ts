import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost : PlaceholderDirective;

  private closeAlertSub : Subscription;

  constructor(
    private authService : AuthService, 
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private store: Store<fromApp.AppState>
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
        // authObs = this.authService.login(email, password);
        this.store.dispatch(
          new AuthActions.LoginStart({email: email, password: password})
        );
      }
      else{
        // authObs = this.authService.singUp(email, password);
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
    const componentRef = this.viewContainerRef.createComponent(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    componentRef.instance.message = message;

    this.closeAlertSub = componentRef.instance.close.subscribe(() => {
      this.closeAlertSub.unsubscribe();
      componentRef.destroy();
      hostViewContainerRef.clear();
    });
    // hostViewContainer.createComponent(alertCmpFactory);
  }
}
