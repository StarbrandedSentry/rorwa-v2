import { Component, ElementRef, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Research } from '../../models/research.model';
import { Center } from '../../models/center.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { WriterService } from 'src/app/shared/writer.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Writer } from 'src/app/models/writer.model';

// @ts-ignore
@Component({
  selector: 'app-center-research-add',
  templateUrl: './center-research-add.component.html',
  styleUrls: ['./center-research-add.component.scss']
})
export class CenterResearchAddComponent implements OnInit {
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

  @ViewChild('_authorInput', {static: false}) _authorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

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

  selected(event: MatAutocompleteSelectedEvent) : void {
    this.authorInput.push(event.option.viewValue);
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

  async startUpload(event: FileList) {
    // Placeholder file type error
    if (event.item(0).type !== 'application/pdf') {
      this.errorMessage.next('Unsupported file type');
      this.inputFile.nativeElement.value = '';
      return;
    }
    this.file = event.item(0);

    /*this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.afFirestore
            .collection('researches')
            .add({ this.url, size: snap.totalBytes });
        }
      })*/
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
              centerID: this.centerID,
              centerName: this.center.name,
              title: this.researchTitle.value,
              author: this.authorInput,
              date: this.publishDate.value,
              abstract: this.researchAbstract.value,
              university: this.university.value,
              program: this.program.value,
              category: this.category.value,
              tags: this.researchTags
            };
            this.afFirestore.collection('researches')
              .add(research)
              .then(res => {
                this.successMessage.next('Research successfully added!');
              })
              .catch(err => {
                this.errorMessage.next(err);
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
}
