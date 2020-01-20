import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseCollectionModule } from '../firebase-collection/firebase-collection.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { ResearchComponent } from './research/research.component';
import { BookComponent } from './book/book.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [{ path: '', component: SearchComponent }];

@NgModule({
  declarations: [
    SearchComponent,
    ResearchComponent,
    BookComponent,
    JournalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FirebaseCollectionModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class SearchModule {}
