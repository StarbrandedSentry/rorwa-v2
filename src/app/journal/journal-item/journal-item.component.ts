import { Component, OnInit } from '@angular/core';
import { Research } from '../../models/research.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Journal } from '../../models/journal.model';

@Component({
  selector: 'app-journal-item',
  templateUrl: './journal-item.component.html',
  styleUrls: ['./journal-item.component.scss']
})
export class JournalItemComponent implements OnInit {
  journal$;
  journal: Journal;

  constructor(
    private afFirestore: AngularFirestore,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.journal$ = this.ar.paramMap.pipe(
      switchMap(params => {
        return this.afFirestore
          .doc('journals/' + params.get('id'))
          .snapshotChanges()
          .pipe(
            map(a => {
              const data = a.payload.data() as Journal;
              data.id = a.payload.id;
              return data;
            })
          );
      })
    );
    this.journal$.subscribe(journal => {
      this.journal = journal;
    });
  }
}
