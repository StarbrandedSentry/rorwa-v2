import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';
import { Journal } from 'src/app/models/journal.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Center } from 'src/app/models/center.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JournalService } from 'src/app/shared/journal.service';

@Component({
  selector: 'app-center-journal-add',
  templateUrl: './center-journal-add.component.html',
  styleUrls: ['./center-journal-add.component.scss']
})
export class CenterJournalAddComponent implements OnInit {
  journalFormGroup: FormGroup;
  center$: Observable<Center>;
  center: Center;
  centerID: string;

  constructor(
    public categoryService: CategoryService,
    private journalService: JournalService,
    private formBuilder: FormBuilder,
    private ar: ActivatedRoute,
    private afFirestore: AngularFirestore
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
    // Get center ID through the params
    this.ar.parent.parent.paramMap.subscribe(params => {
      this.centerID = params.get('id');
      this.center$ = this.afFirestore
        .doc('centers/' + this.centerID)
        .snapshotChanges()
        .pipe(
          map(a => {
            const data = a.payload.data() as Center;
            data.id = a.payload.id;
            return data;
          })
        );
    });
    this.center$.subscribe(center => {
      this.center = center;
    });

    this.journalFormGroup = this.formBuilder.group({
      journalTitle: ['', [Validators.minLength(8), Validators.required]],
      publisher: ['', [Validators.minLength(8), Validators.required]],
      publishDate: ['', [Validators.required]],
      category: ['', [Validators.minLength(8), Validators.required]],
      description: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  onAddJournalClick(): void {
    const newJournal: Journal = {
      title: this.journalTitle.value,
      centerID: this.centerID,
      centerName: this.center.name,
      publisher: this.publisher.value,
      date: this.publishDate.value,
      category: this.category.value,
      description: this.description.value
    };
    this.journalService.addNewJournal(newJournal);
  }
}
