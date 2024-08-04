import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from './helpers/pipes/img-url.pipe';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { SidebarComponent } from './common-ui/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TgUsernamePipe } from './helpers/pipes/tg-username.pipe';
import { AuthService } from './data/services/auth.service';
import { AuthInterceptorService } from './data/services/auth.interceptor.service';
import { SvgIconComponent } from './common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './common-ui/sidebar/subscriber-card/subscriber-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileCardComponent,
    ImgUrlPipe,
    LoginPageComponent,
    SearchPageComponent,
    ProfilePageComponent,
    LayoutComponent,
    SidebarComponent,
    TgUsernamePipe,
    SvgIconComponent,
    SubscriberCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProfileService,
    AuthService,
    AuthInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
