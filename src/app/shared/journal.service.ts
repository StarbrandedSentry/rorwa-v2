import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Journal } from '../models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  journals$: Observable<Journal[]>;
  private _journals: Journal[];

  journalCollection: AngularFirestoreCollection<Journal> = this.afFirestore.collection('journals');

  constructor(private afFirestore: AngularFirestore) {
    this.journals$ = this.afFirestore
      .collection('journals')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Journal;
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
    this.journals$.subscribe(journals => {
      this._journals = journals;
    });
  }

  addNewJournal(journal: Journal) {
    return this.journalCollection.add(journal);
  }

  get journals() {
    return this._journals;
  }
}
