import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-center-researches',
  templateUrl: './center-researches.component.html',
  styleUrls: ['./center-researches.component.scss']
})
export class CenterResearchesComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  onAddResearchClick() {
    this.router.navigate(['add'], { relativeTo: this.ar.parent });
  }
}
