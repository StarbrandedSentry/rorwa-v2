import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../../shared/research.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  constructor(public researchService: ResearchService) {}

  ngOnInit() {}
}
