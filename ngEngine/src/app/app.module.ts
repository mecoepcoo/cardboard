import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ROUTER_CONFIG } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DesktopToolbarComponent } from './desktop-toolbar/desktop-toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

import { UserService } from './share/user.service';
import { SelectCheckboxService } from './share/select-checkbox.service';

import { CheckedAllDirective } from './share/checked-all.directive';

// ng build时，导入CookieOptions
// import { CookieService } from 'angular2-cookie';
import { CookieService, CookieOptions } from 'angular2-cookie';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DesktopToolbarComponent,
    SideMenuComponent,
    CheckedAllDirective,
    CategoryDetailComponent,
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
    SelectCheckboxService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
