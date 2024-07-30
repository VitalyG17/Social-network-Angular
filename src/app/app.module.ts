import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from './helpers/pipes/img-url.pipe';

@NgModule({
  declarations: [AppComponent, ProfileCardComponent, ImgUrlPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [ProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
