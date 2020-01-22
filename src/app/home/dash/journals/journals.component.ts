import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../../../shared/research.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {
  constructor(public researchService: ResearchService) {}

  ngOnInit() {}
}
