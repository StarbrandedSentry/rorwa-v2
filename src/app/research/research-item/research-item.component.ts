import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Research } from '../../models/research.model';

@Component({
  selector: 'app-research-item',
  templateUrl: './research-item.component.html',
  styleUrls: ['./research-item.component.scss']
})
export class ResearchItemComponent implements OnInit {
  research$;
  research: Research;

  constructor(
    private afFirestore: AngularFirestore,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.research$ = this.ar.paramMap.pipe(
      switchMap(params => {
        return this.afFirestore
          .doc('researches/' + params.get('id'))
          .snapshotChanges()
          .pipe(
            map(a => {
              const data = a.payload.data() as Research;
              data.id = a.payload.id;
              return data;
            })
          );
      })
    );
    this.research$.subscribe(research => {
      this.research = research;
    });
  }
}
