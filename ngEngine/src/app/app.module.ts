import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ROUTER_CONFIG } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './share/user.service';

// ng build时，导入CookieOptions
// import { CookieService } from 'angular2-cookie';
import { CookieService, CookieOptions } from 'angular2-cookie';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTER_CONFIG),
    FormsModule,
    HttpModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    CookieService,
    // CookieOptions,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
