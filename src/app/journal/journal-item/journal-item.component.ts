import { Component, ElementRef, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Research } from '../../models/research.model';
import { Center } from '../../models/center.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { WriterService } from 'src/app/shared/writer.service';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from '@angular/material';
import { Writer } from 'src/app/models/writer.model';
import { Journal } from '../../models/journal.model';

@Component({
  selector: 'app-journal-item',
  templateUrl: './journal-item.component.html',
  styleUrls: ['./journal-item.component.scss']
})
export class JournalItemComponent implements OnInit {
  journal$;
  journal: Journal;
  researches$: Observable<Research[]>;
  researches: Research[];

  url: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  researchFormGroup: FormGroup;
  dURL: string;

  center$: Observable<Center>;
  center: Center;
  centerID: string;

  file;
  errorMessage: Subject<string> = new Subject<string>();
  successMessage: Subject<string> = new Subject<string>();

  @ViewChild('fileInput', { static: false })
  inputFile: ElementRef;

  // Authors and Keywords
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  authorInput: any = [];
  researchTags: any = [];
  writerCollection: string[];
  filteredAuthors: Observable<string[]>;
  authors: Writer[];

  @ViewChild('_authorInput', { static: false }) _authorInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  addAuthor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.authorInput.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.researchTags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeAuthor(author): void {
    const index = this.authorInput.indexOf(author);

    if (index >= 0) {
      this.authorInput.splice(index, 1);
    }
  }

  removeTag(tag): void {
    const index = this.researchTags.indexOf(tag);

    if (index >= 0) {
      this.researchTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authorInput.push(event.option.value);
    this._authorInput.nativeElement.value = '';
    this.authorsList.setValue(null);
  }

  constructor(
    private storage: AngularFireStorage,
    private afFirestore: AngularFirestore,
    private ar: ActivatedRoute,
    private formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public writerService: WriterService
  ) {}

  ngOnInit() {
    this.journal$ = this.ar.paramMap.pipe(
      switchMap(params => {
        return this.afFirestore
          .doc('journals/' + params.get('id'))
          .snapshotChanges()
          .pipe(
            map(a => {
              const data = a.payload.data() as Journal;
              data.id = a.payload.id;
              return data;
            })
          );
      })
    );
    this.journal$.subscribe(journal => {
      this.journal = journal;
    });

    this.researchFormGroup = this.formBuilder.group({
      researchTitle: ['', [Validators.minLength(8), Validators.required]],
      authorsList: [''],
      publishDate: ['', [Validators.required]],
      researchAbstract: ['', [Validators.minLength(8), Validators.required]],
      university: ['', [Validators.minLength(8), Validators.required]],
      program: ['', [Validators.minLength(8), Validators.required]],
      category: ['', [Validators.required]],
      researchTagsList: ['']
    });
  }

  async startUpload(event: FileList) {
    // Placeholder file type error
    if (event.item(0).type !== 'application/pdf') {
      this.errorMessage.next('Unsupported file type');
      this.inputFile.nativeElement.value = '';
      return;
    }
    this.file = event.item(0);
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  async onAddClick() {
    const path = 'test/' + new Date().getTime() + '_' + this.file.name;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage = this.task.percentageChanges();

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            // START SAVING TO FIRESTORE
            const research: Research = {
              downloadURL: url,
              centerID: this.journal.centerID,
              centerName: this.journal.centerName,
              journalID: this.journal.id,
              journalTitle: this.journal.title,
              title: this.researchTitle.value,
              author: this.authorInput,
              date: this.publishDate.value,
              abstract: this.researchAbstract.value,
              university: this.university.value,
              program: this.program.value,
              category: this.category.value,
              tags: this.researchTags
            };
            this.afFirestore
              .collection('researches')
              .add(research)
              .then(res => {
                this.successMessage.next('Research successfully added!');
              })
              .catch(err => {
                this.errorMessage.next(err);
              });
            this.researchFormGroup.reset();
            this.authorInput = [];
            this.researchTags = [];
            Object.keys(this.researchFormGroup.controls).forEach(key => {
              this.researchFormGroup.get(key).setErrors(null);
            });
          });
        })
      )
      .subscribe(res => {});
  }

  get researchTitle() {
    return this.researchFormGroup.get('researchTitle');
  }

  get authorsList() {
    return this.researchFormGroup.get('authorsList');
  }

  get publishDate() {
    return this.researchFormGroup.get('publishDate');
  }

  get researchAbstract() {
    return this.researchFormGroup.get('researchAbstract');
  }

  get university() {
    return this.researchFormGroup.get('university');
  }

  get program() {
    return this.researchFormGroup.get('program');
  }

  get category() {
    return this.researchFormGroup.get('category');
  }

  get researchTagsList() {
    return this.researchTagsList.get('researchTagsList');
  }
}
