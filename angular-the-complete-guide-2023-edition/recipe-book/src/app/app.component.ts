import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-second-app';

  constructor(
    // private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
    @Inject(PLATFORM_ID) private platformId 
    ){}

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
     this.store.dispatch(new AuthActions.AutoLogin());
    }
    // this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent');
  } 
  // loadedFeature = 'recipe';

  // onNavigate(feature: string){
  //   this.loadedFeature = feature;
  // }
}
