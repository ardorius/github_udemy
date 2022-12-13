import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost : PlaceholderDirective;

  private closeAlertSub : Subscription;
  private storeSub: Subscription;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private store: Store<fromApp.AppState>
    // private componentFactoryResolver: ComponentFactoryResolver//deprecated
    ) { }

  ngOnInit() {
   this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error){
        this.showErrorAlert(this.error);
      }
    })
  }

  ngOnDestroy() {
    if (this.closeAlertSub){
      this.closeAlertSub.unsubscribe();
    }
    if (this.storeSub){
      this.storeSub.unsubscribe();
    }
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
        // authObs = this.authService.login(email, password);
        this.store.dispatch(
          new AuthActions.LoginStart({email: email, password: password})
        );
      }
      else{
        this.store.dispatch(
          new AuthActions.SignupStart({email: email, password: password})
        )
        // authObs = this.authService.singUp(email, password);
      }

    }
    else return;
    form.reset();
  }

  OnHandleError(){
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError())
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
