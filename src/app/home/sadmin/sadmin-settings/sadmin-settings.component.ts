import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/category.service';

@Component({
  selector: 'app-sadmin-settings',
  templateUrl: './sadmin-settings.component.html',
  styleUrls: ['./sadmin-settings.component.scss']
})
export class SadminSettingsComponent implements OnInit {
  isAddingCategory: boolean;
  catAddBtnText = 'Add';
  newCategory: string;

  constructor(public categoryService: CategoryService) {}

  ngOnInit() {}

  onAddCategoryClick() {
    if (!this.newCategory) {
      return;
    }
    this.addCategoryStart();
    this.categoryService.addCategory(this.newCategory).then(res => {
      this.addCategoryStop();
      this.newCategory = '';
    });
  }

  private addCategoryStart() {
    this.isAddingCategory = true;
    this.catAddBtnText = 'Adding...';
  }

  private addCategoryStop() {
    this.isAddingCategory = false;
    this.catAddBtnText = 'Add';
  }
}
