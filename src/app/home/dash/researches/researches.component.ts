import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../../../shared/research.service';

@Component({
  selector: 'app-researches',
  templateUrl: './researches.component.html',
  styleUrls: ['./researches.component.scss']
})
export class ResearchesComponent implements OnInit {
  constructor(public researchService: ResearchService) {}

  ngOnInit() {}
}
