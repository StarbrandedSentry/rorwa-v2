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

const redirectSignedInToDash = redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full' },
      { path: 'dash', component: DashComponent },
      { path: 'search', component: SearchComponent },
      {
        path: 'sadmin',
        component: SadminComponent,
        canActivate: [SadminGuard],
        children: [
          { path: '', redirectTo: 'dash', pathMatch: 'full' },
          { path: 'dash', component: SadminDashComponent },
          { path: 'settings', component: SadminSettingsComponent }
        ]
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    ...canActivate(redirectSignedInToDash)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
