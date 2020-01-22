import { Component, OnInit } from '@angular/core';
import { TabLink } from '../../models/misc.model';
import { CategoryService } from '../../shared/category.service';
import { ResearchService } from '../../shared/research.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  selectedCategory: string;
  tabLinks: TabLink[] = [
    { path: 'researches', label: 'Researches' },
    { path: 'books', label: 'Books' },
    { path: 'journals', label: 'Journals' }
  ];
  constructor(
    public categoryServ: CategoryService,
    private researchServ: ResearchService
  ) {}

  ngOnInit() {}

  onResetFilterClick() {
    this.selectedCategory = '';
    this.researchServ.removeFilter('category');
  }

  filterByCategory() {
    this.researchServ.filterProperty('category', this.selectedCategory);
  }
}
