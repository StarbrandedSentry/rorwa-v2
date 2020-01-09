import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center.component';
import { RouterModule, Routes } from '@angular/router';
import { CenterDashComponent } from './center-dash/center-dash.component';
import { FirebaseCollectionModule } from '../firebase-collection/firebase-collection.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full' },
      { path: ':id', component: CenterDashComponent }
    ]
  }
];

@NgModule({
  declarations: [CenterComponent, CenterDashComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FirebaseCollectionModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class CenterModule {}
