import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /*user: User;
  isAccMenuVisible = false;*/
  constructor() /*iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private auth: AuthService,
    private afAuth: AngularFireAuth*/
  {
    /*iconRegistry.addSvgIcon(
      'research',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/research.svg')
    );*/
  }

  ngOnInit() {}

  /*toggleAccMenu() {
    this.isAccMenuVisible = !this.isAccMenuVisible;
  }

  closeAccMenu(event) {
    this.isAccMenuVisible = false;
  }

  onSignOutClick() {
    this.auth.signOut();
  }*/
}
