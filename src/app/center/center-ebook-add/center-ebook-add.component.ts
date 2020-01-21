import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-center-ebook-add',
  templateUrl: './center-ebook-add.component.html',
  styleUrls: ['./center-ebook-add.component.scss']
})
export class CenterEbookAddComponent implements OnInit {
  centerID: string;
  ebookFormGroup: FormGroup;

  // e-Book tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ebookTags: any = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.ebookTags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: any): void {
    this.ebookTags.splice(index, 1);
  }

  constructor(
    private ar: ActivatedRoute,
    private storage: AngularFireStorage,
    private afFirestore: AngularFirestore,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder
    ) {}
    
  ngOnInit() {
    this.ar.parent.parent.paramMap.subscribe(params => {
      this.centerID = params.get('id');
    });

    this.ebookFormGroup = this.formBuilder.group({
      ebookTitle: ['', [Validators.minLength(8), Validators.required]],
      author: ['', [Validators.minLength(8), Validators.required]],
      publishDate: ['', Validators.required],
      description: ['', [Validators.minLength(8), Validators.required]],
      category: ['', [Validators.minLength(8), Validators.required]],
      ebookTagsList: ['']
    });
  }

  get ebookTitle() {
    return this.ebookFormGroup.get('ebookTitle');
  }

  get author() {
    return this.ebookFormGroup.get('author');
  }

  get publishDate() {
    return this.ebookFormGroup.get('publishDate');
  }

  get description() {
    return this.ebookFormGroup.get('description');
  }

  get category() {
    return this.ebookFormGroup.get('category');
  }

  get ebookTagsList() {
    return this.ebookFormGroup.get('ebookTagsList');
  }
}
