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
import { FormsModule } from '@angular/forms';

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
            component: CenterResearchAddComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'admins',
            component: CenterAdminsComponent,
            canActivate: [SadminGuard]
          }
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
    CenterAdminsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FirebaseCollectionModule,
    HttpClientModule,
    MaterialModule,
    NavModule,
    FormsModule
  ]
})
export class CenterModule {}
