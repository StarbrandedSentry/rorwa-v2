import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  isAccMenuVisible = false;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private auth: AuthService,
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
    console.log('toggled!');
  }

  closeAccMenu(event) {
    this.isAccMenuVisible = false;
  }
}
