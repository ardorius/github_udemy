import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
// import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
// import { authReducer } from './auth/store/auth.reducer';
// import { LoggingService } from './logging.service';

import * as fromApp from './store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appRedurer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ],
  // providers: [LoggingService],
  bootstrap: [AppComponent]
  //, entryComponents:[
  //   AlertComponent
  // ]
})
export class AppModule { }
