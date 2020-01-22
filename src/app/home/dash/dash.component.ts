import { Component, OnInit } from '@angular/core';
import { TabLink } from '../../models/misc.model';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  tabLinks: TabLink[] = [
    { path: 'researches', label: 'Researches' },
    { path: 'journals', label: 'Journals' }
  ];
  constructor() {}

  ngOnInit() {}
}
