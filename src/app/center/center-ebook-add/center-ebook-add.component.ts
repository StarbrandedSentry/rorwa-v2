import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-center-ebook-add',
  templateUrl: './center-ebook-add.component.html',
  styleUrls: ['./center-ebook-add.component.scss']
})
export class CenterEbookAddComponent implements OnInit {
  centerID: string;
  constructor(private ar: ActivatedRoute) {}

  ngOnInit() {
    this.ar.parent.parent.paramMap.subscribe(params => {
      this.centerID = params.get('id');
    });
  }
}
