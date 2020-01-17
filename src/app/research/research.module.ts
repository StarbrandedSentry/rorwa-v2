import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchItemComponent } from './research-item/research-item.component';
import { ResearchComponent } from './research.component';
import { MaterialModule } from '../material/material.module';
import { FirebaseCollectionModule } from '../firebase-collection/firebase-collection.module';
import { MessageModule } from '../message/message.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ResearchComponent,
    children: [{ path: ':id', component: ResearchItemComponent }]
  }
];

@NgModule({
  declarations: [ResearchItemComponent, ResearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FirebaseCollectionModule,
    MessageModule,
    RouterModule.forChild(routes)
  ]
})
export class ResearchModule {}
