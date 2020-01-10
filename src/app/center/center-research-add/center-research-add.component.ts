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
    private ar: ActivatedRoute
  ) {
    // Get center ID through the params
    this.ar.parent.params.subscribe(params => {
      this.centerID = params['id'];
    });
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    const path = 'test/' + new Date().getTime() + '_' + file.name;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

    this.percentage = this.task.percentageChanges();

    const dURL = this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => (this.url = url));
        })
        ).subscribe();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.afFirestore.collection('researches').add({ dURL , size: snap.totalBytes });
        }
      })
      );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  ngOnInit() {}
}
