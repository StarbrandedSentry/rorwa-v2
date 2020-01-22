import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  search: string;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  user: User;
  isAccMenuVisible = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      'research',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/research.svg')
    );
  }

  toggleAccMenu() {
    this.isAccMenuVisible = !this.isAccMenuVisible;
  }

  closeAccMenu(event) {
    this.isAccMenuVisible = false;
  }

  onSignOutClick() {
    this.auth.signOut();
  }

  onResetSearchClick() {
    this.search = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: { search: null }
    });
  }

  onSearchClick() {
    this.router.navigate([], {
      queryParams: { search: this.search }
    });
  }
}
