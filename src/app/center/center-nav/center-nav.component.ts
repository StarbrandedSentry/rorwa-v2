import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-center-nav',
  templateUrl: './center-nav.component.html',
  styleUrls: ['./center-nav.component.scss']
})
export class CenterNavComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
