import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Research } from '../../models/research.model';

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

  centerID: string;
  constructor(
    private storage: AngularFireStorage,
    private afFirestore: AngularFirestore,
    private ar: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // Get center ID through the params
    this.ar.parent.params.subscribe(params => {
      this.centerID = params['id'];
    });
  }

  async startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type !== 'application/pdf') {
      console.error('Unsupported file type')
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

  ngOnInit() {
    this.researchFormGroup = this.formBuilder.group({
      researchTitle: ['', [Validators.minLength(8), Validators.required]],
      author: ['', [Validators.minLength(8), Validators.required]],
      date: ['', [Validators.required]],
      researchAbstract: ['', [Validators.minLength(8), Validators.required]]
    })
  }
}
