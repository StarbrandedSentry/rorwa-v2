import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalItemComponent } from './journal-item/journal-item.component';
import { JournalComponent } from './journal.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FirebaseCollectionModule } from '../firebase-collection/firebase-collection.module';
import { MessageModule } from '../message/message.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCommonModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
    children: [{ path: ':id', component: JournalItemComponent }]
  }
];

@NgModule({
  declarations: [JournalItemComponent, JournalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FirebaseCollectionModule,
    MessageModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule
  ]
})
export class JournalModule {}
