import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Research } from '../models/research.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {
  researches$: Observable<Research[]>;
  private _researches: Research[];

  constructor(private afFirestore: AngularFirestore) {
    this.researches$ = this.afFirestore
      .collection('researches')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Research;
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
    this.researches$.subscribe(researches => {
      this._researches = researches;
    });
  }

  public get researches() {
    return this._researches;
  }
}
