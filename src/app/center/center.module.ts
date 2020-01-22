import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center.component';
import { RouterModule, Routes } from '@angular/router';
import { CenterDashComponent } from './center-dash/center-dash.component';
import { FirebaseCollectionModule } from '../firebase-collection/firebase-collection.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { NavModule } from '../nav/nav.module';
import { CenterNavComponent } from './center-nav/center-nav.component';
import { CenterResearchesComponent } from './center-researches/center-researches.component';
import { CenterResearchAddComponent } from './center-research-add/center-research-add.component';
import { AdminGuard } from '../guards/admin.guard';
import { CenterAdminsComponent } from './center-admins/center-admins.component';
import { SadminGuard } from '../guards/sadmin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../message/message.module';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatCommonModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';
import { CenterAddComponent } from './center-add/center-add.component';
import { CenterJournalAddComponent } from './center-journal-add/center-journal-add.component';
import { CenterEbookAddComponent } from './center-ebook-add/center-ebook-add.component';
import { CenterWritersComponent } from './center-writers/center-writers.component';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      { path: '', redirectTo: 'dash/:id', pathMatch: 'full' },
      {
        path: 'dash/:id',
        component: CenterDashComponent,
        children: [
          { path: '', redirectTo: 'researches', pathMatch: 'full' },
          { path: 'researches', component: CenterResearchesComponent },
          {
            path: 'add',
            component: CenterAddComponent,
            canActivate: [AdminGuard],
            children: [
              { path: '', redirectTo: 'research', pathMatch: 'full' },
              { path: 'research', component: CenterResearchAddComponent },
              { path: 'ebook', component: CenterEbookAddComponent },
              { path: 'journal', component: CenterJournalAddComponent }
            ]
          },
          {
            path: 'admins',
            component: CenterAdminsComponent,
            canActivate: [SadminGuard]
          },
          { path: 'writers', component: CenterWritersComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    CenterComponent,
    CenterDashComponent,
    CenterNavComponent,
    CenterResearchesComponent,
    CenterResearchAddComponent,
    CenterAdminsComponent,
    CenterJournalAddComponent,
    CenterAddComponent,
    CenterEbookAddComponent,
    CenterWritersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FirebaseCollectionModule,
    HttpClientModule,
    MaterialModule,
    NavModule,
    FormsModule,
    MessageModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCommonModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class CenterModule {}
