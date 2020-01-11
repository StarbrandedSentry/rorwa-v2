import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: User;
  isAccMenuVisible = false;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    iconRegistry.addSvgIcon(
      'research',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/research.svg')
    );
  }

  ngOnInit() {}

  toggleAccMenu() {
    this.isAccMenuVisible = !this.isAccMenuVisible;
  }

  closeAccMenu(event) {
    this.isAccMenuVisible = false;
  }

  onSignOutClick() {
    this.auth.signOut();
  }
}
