import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Research } from '../../models/research.model';
import { Center } from '../../models/center.model';

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
  constructor(
    private storage: AngularFireStorage,
    private afFirestore: AngularFirestore,
    private ar: ActivatedRoute
  ) {
    // Get center ID through the params
    this.ar.parent.params.subscribe(params => {
      this.centerID = params['id'];
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
  }

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
              centerName: this.center.name
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

  ngOnInit() {}
}
