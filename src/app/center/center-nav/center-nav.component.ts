import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-center-nav',
  templateUrl: './center-nav.component.html',
  styleUrls: ['./center-nav.component.scss']
})
export class CenterNavComponent implements OnInit {
  centerID: string;
  constructor(public authService: AuthService, private ar: ActivatedRoute) {}

  ngOnInit() {
    this.ar.paramMap.subscribe(params => {
      this.centerID = params.get('id');
    });
  }
}
