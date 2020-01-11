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
import { FirebaseCollectionModule } from './firebase-collection/firebase-collection.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { AuthService } from './shared/auth.service';
import { SadminComponent } from './home/sadmin/sadmin.component';
import { SadminDashComponent } from './home/sadmin/sadmin-dash/sadmin-dash.component';
import { SadminNavComponent } from './home/sadmin/sadmin-nav/sadmin-nav.component';
import { SadminSettingsComponent } from './home/sadmin/sadmin-settings/sadmin-settings.component';
import { SadminGuard } from './guards/sadmin.guard';
import { CreateCenterComponent } from './home/sadmin/create-center/create-center.component';
import { InvitationModule } from './invitation/invitation.module';
import { CenterService } from './shared/center.service';
import { UserService } from './shared/user.service';
import { MessageModule } from './message/message.module';
import { CenterModule } from './center/center.module';
import { NavModule } from './nav/nav.module';
import { ResearchService } from './shared/research.service';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    HomeComponent,
    DashComponent,
    SearchComponent,
    SignInComponent,
    SadminComponent,
    SadminDashComponent,
    SadminNavComponent,
    SadminSettingsComponent,
    CreateCenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FirebaseCollectionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    InvitationModule,
    MessageModule,
    CenterModule,
    NavModule
  ],
  providers: [
    [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
    AuthService,
    SadminGuard,
    CenterService,
    UserService,
    ResearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
