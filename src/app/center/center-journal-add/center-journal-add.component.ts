import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-center-journal-add',
  templateUrl: './center-journal-add.component.html',
  styleUrls: ['./center-journal-add.component.scss']
})
export class CenterJournalAddComponent implements OnInit {
  journalFormGroup: FormGroup;
  categories: Observable<string[]>;
  centerID: string;
  constructor(
    private afFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private ar: ActivatedRoute
  ) {}

  get journalTitle() {
    return this.journalFormGroup.get('journalTitle');
  }

  get publisher() {
    return this.journalFormGroup.get('publisher');
  }

  get publishDate() {
    return this.journalFormGroup.get('publishDate');
  }

  get category() {
    return this.journalFormGroup.get('category');
  }

  get description() {
    return this.journalFormGroup.get('description');
  }

  ngOnInit() {
    this.ar.parent.parent.paramMap.subscribe(params => {
      this.centerID = params.get('id');
    });

    this.journalFormGroup = this.formBuilder.group({
      journalTitle: ['', [Validators.minLength(8), Validators.required]],
      publisher: ['', [Validators.minLength(8), Validators.required]],
      publishDate: ['', [Validators.required]],
      category: ['', [Validators.minLength(8), Validators.required]],
      description: ['', [Validators.minLength(8), Validators.required]]
    });
  }
}
