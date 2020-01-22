import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './home/dash/dash.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { SearchComponent } from './home/search/search.component';
import { SadminComponent } from './home/sadmin/sadmin.component';
import { SadminDashComponent } from './home/sadmin/sadmin-dash/sadmin-dash.component';
import { SadminSettingsComponent } from './home/sadmin/sadmin-settings/sadmin-settings.component';
import { SadminGuard } from './guards/sadmin.guard';
import { CreateCenterComponent } from './home/sadmin/create-center/create-center.component';
import { ResearchesComponent } from './home/dash/researches/researches.component';
import { JournalsComponent } from './home/dash/journals/journals.component';
import { EbooksComponent } from './home/dash/ebooks/ebooks.component';

const redirectSignedInToDash = redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full' },
      {
        path: 'dash',
        component: DashComponent,
        children: [
          { path: '', redirectTo: 'researches', pathMatch: 'full'},
          { path: 'researches', component: ResearchesComponent },
          { path: 'books', component: EbooksComponent },
          { path: 'journals', component: JournalsComponent }
        ]
      },
      { path: 'search', component: SearchComponent },
      {
        path: 'sadmin',
        component: SadminComponent,
        canActivate: [SadminGuard],
        children: [
          { path: '', redirectTo: 'dash', pathMatch: 'full' },
          { path: 'dash', component: SadminDashComponent },
          { path: 'settings', component: SadminSettingsComponent },
          { path: 'create', component: CreateCenterComponent }
        ]
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    ...canActivate(redirectSignedInToDash)
  },
  {
    path: 'invitation',
    loadChildren: './invitation/invitation.module#InvitationModule'
  },
  { path: 'center', loadChildren: './center/center.module#CenterModule' },
  {
    path: 'research',
    loadChildren: './research/research.module#ResearchModule'
  },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
