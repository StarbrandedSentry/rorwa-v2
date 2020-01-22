import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../../../shared/research.service';

@Component({
  selector: 'app-ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.scss']
})
export class EbooksComponent implements OnInit {
  constructor(public researchService: ResearchService) {}

  ngOnInit() {}
}
