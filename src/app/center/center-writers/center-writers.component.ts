import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-center-writers',
  templateUrl: './center-writers.component.html',
  styleUrls: ['./center-writers.component.scss']
})
export class CenterWritersComponent implements OnInit {
  centerID: string;
  constructor(public authService: AuthService, private ar: ActivatedRoute) {}

  ngOnInit() {
    this.ar.parent.paramMap.subscribe(params => {
      this.centerID = params.get('id');
    });
  }
}
