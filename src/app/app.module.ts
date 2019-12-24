import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './home/dash/dash.component';
import { SearchComponent } from './home/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { ErrorComponent } from './message/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    HomeComponent,
    DashComponent,
    SearchComponent,
    SignInComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
