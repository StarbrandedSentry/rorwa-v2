import { Component, OnInit } from '@angular/core';
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
    private ebookService: EbookService,
    private formBuilder: FormBuilder
  ) {}

  get ebookTitle() {
    return this.ebookFormGroup.get('ebookTitle');
  }

  get author() {
    return this.ebookFormGroup.get('author');
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
    const file = event.item(0);

    // Placeholder file type error
    if (file.type !== 'application/pdf') {
      console.error('Unsupported file type');
      return;
    }

    const path = 'test/' + new Date().getTime() + '_' + file.name;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

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
              author: this.author.value,
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
          });
        })
      )
      .subscribe(res => {});
  }
}
