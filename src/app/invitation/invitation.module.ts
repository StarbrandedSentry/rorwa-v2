import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './invitation.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: ':id', component: InvitationComponent }];

@NgModule({
  declarations: [InvitationComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class InvitationModule {}
