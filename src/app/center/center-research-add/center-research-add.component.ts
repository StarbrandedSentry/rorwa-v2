import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private storage: AngularFireStorage, private afFirestore: AngularFirestore) {}

  startUpload(event: FileList) {
    const file = event.item(0);
    const path = 'test/' + new Date().getTime() + '_' + file.name;

    this.task = this.storage.upload(path, file);

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
        tap(snap => {
          if (snap.bytesTransferred === snap.totalBytes) {
            console.log(snap.bytesTransferred);
            this.afFirestore.collection('researches').add({ path, size: snap.totalBytes });
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
