import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './invitation.component';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseCollectionModule } from '../firebase-collection/firebase-collection.module';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { InvitationErrorComponent } from './invitation-error/invitation-error.component';
import { InvitationContentComponent } from './invitation-content/invitation-content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../message/message.module';

const routes: Routes = [
  { path: ':id', component: InvitationContentComponent },
  { path: 'whoops/error', component: InvitationErrorComponent }
];

@NgModule({
  declarations: [
    InvitationComponent,
    InvitationErrorComponent,
    InvitationContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FirebaseCollectionModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MessageModule
  ]
})
export class InvitationModule {}
