import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoryService } from 'src/app/shared/category.service';
import { Observable, Subject } from 'rxjs';
import { Center } from 'src/app/models/center.model';
import { map, finalize } from 'rxjs/operators';
import { Ebook } from 'src/app/models/ebook.model';
import { EbookService } from 'src/app/shared/ebook.service';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { Writer } from 'src/app/models/writer.model';
import { WriterService } from 'src/app/shared/writer.service';

@Component({
  selector: 'app-center-ebook-add',
  templateUrl: './center-ebook-add.component.html',
  styleUrls: ['./center-ebook-add.component.scss']
})
export class CenterEbookAddComponent implements OnInit {
  center$: Observable<Center>;
  center: Center;
  centerID: string;
  ebookFormGroup: FormGroup;

  url: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  errorMessage: Subject<string> = new Subject<string>();
  successMessage: Subject<string> = new Subject<string>();

  @ViewChild('fileInput', { static: false })
  inputFile: ElementRef;

  file;

  // e-Book tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ebookTags: any = [];
  writerCollection: string[];
  filteredAuthors: Observable<string[]>;
  authors: Writer[];
  authorInput: any = [];

  @ViewChild('_authorInput', { static: false }) _authorInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

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

  remove(index: any): void {
    this.ebookTags.splice(index, 1);
  }

  removeAuthor(author): void {
    const index = this.authorInput.indexOf(author);

    if (index >= 0) {
      this.authorInput.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authorInput.push(event.option.value);
    this._authorInput.nativeElement.value = '';
    this.authorsList.setValue(null);
  }

  constructor(
    private ar: ActivatedRoute,
    private storage: AngularFireStorage,
    private afFirestore: AngularFirestore,
    public categoryService: CategoryService,
    public writerService: WriterService,
    private formBuilder: FormBuilder
  ) {}

  get ebookTitle() {
    return this.ebookFormGroup.get('ebookTitle');
  }

  get authorsList() {
    return this.ebookFormGroup.get('authorsList');
  }

  get publisher() {
    return this.ebookFormGroup.get('publisher');
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

    this.ebookFormGroup = this.formBuilder.group({
      ebookTitle: ['', [Validators.minLength(8), Validators.required]],
      author: ['', [Validators.minLength(8), Validators.required]],
      publisher: ['', [Validators.minLength(8), Validators.required]],
      publishDate: ['', Validators.required],
      description: ['', [Validators.minLength(8), Validators.required]],
      category: ['', [Validators.required]],
      ebookTagsList: ['']
    });
  }

  async startUpload(event: FileList) {
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

  onAddClick() {
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
            const newEbook: Ebook = {
              title: this.ebookTitle.value,
              downloadURL: url,
              centerID: this.centerID,
              centerName: this.center.name,
              author: this.authorInput,
              publisher: this.publisher.value,
              date: this.publishDate.value,
              description: this.description.value,
              category: this.category.value,
              tags: this.ebookTags
            };
            this.afFirestore
              .collection('ebooks')
              .add(newEbook)
              .then(res => {
                this.successMessage.next('Book successfully added!');
              })
              .catch(err => {
                this.errorMessage.next(err);
              });
            this.ebookFormGroup.reset();
            this.ebookTags = [];
            Object.keys(this.ebookFormGroup.controls).forEach(key => {
              this.ebookFormGroup.get(key).setErrors(null);
            });
          });
        })
      )
      .subscribe(res => {});
  }
}
