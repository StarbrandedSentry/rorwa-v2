import { Component, OnInit } from '@angular/core';
import { TabLink } from '../../models/misc.model';

@Component({
  selector: 'app-center-add',
  templateUrl: './center-add.component.html',
  styleUrls: ['./center-add.component.scss']
})
export class CenterAddComponent implements OnInit {
  tabLinks: TabLink[] = [
    { label: 'Research', path: 'research' },
    { label: 'Book', path: 'ebook' },
    { label: 'Journal', path: 'journal' }
  ];

  constructor() {}

  ngOnInit() {}
}
