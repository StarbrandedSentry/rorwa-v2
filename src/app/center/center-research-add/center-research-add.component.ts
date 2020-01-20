import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Research } from '../../models/research.model';
import { Center } from '../../models/center.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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

  // Research tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  researchTags: any = [];

  add(event: MatChipInputEvent): void {
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

  remove(index: any): void {
    this.researchTags.splice(index, 1);
  }

  constructor(
    private storage: AngularFireStorage,
    private afFirestore: AngularFirestore,
    private ar: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  async startUpload(event: FileList) {
    const file = event.item(0);

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
            // START SAVING TO FIRESTORE
            const research: Research = {
              downloadURL: url,
              centerID: this.centerID,
              centerName: this.center.name,
              title: this.researchTitle.value,
              author: this.author.value,
              date: this.publishDate.value,
              abstract: this.researchAbstract.value,
              tags: this.researchTags
            };
            this.afFirestore.collection('researches').add(research);
          });
        })
      )
      .subscribe(res => {});

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

  get researchTitle() {
    return this.researchFormGroup.get('researchTitle');
  }

  get author() {
    return this.researchFormGroup.get('author');
  }

  get publishDate() {
    return this.researchFormGroup.get('publishDate');
  }

  get researchAbstract() {
    return this.researchFormGroup.get('researchAbstract');
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
      author: ['', [Validators.minLength(8), Validators.required]],
      publishDate: ['', [Validators.required]],
      researchAbstract: ['', [Validators.minLength(8), Validators.required]],
      researchTagsList: ['']
    });
  }
}
