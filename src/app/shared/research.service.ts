import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Research } from '../models/research.model';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Journal } from '../models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {
  researches$: Observable<Research[]>;
  private _researches: Research[];
  private _filteredResearches: Research[];

  journals$: Observable<Journal[]>;
  private _journals: Journal[];
  private _filteredJournals: Journal[];

  ebooks$: Observable<Research[]>;
  private _ebooks: Research[];
  private _filteredEbooks: Research[];

  filters = {};
  searchFilters = ['title', 'abstract'];

  //filterable properties
  title: string;

  constructor(
    private afFirestore: AngularFirestore,
    public ar: ActivatedRoute
  ) {
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
      this.applyFilters();
    });

    this.journals$ = this.afFirestore
      .collection('journals')
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
    this.journals$.subscribe(journals => {
      this._journals = journals;
      this.applyFilters();
    });

    this.ebooks$ = this.afFirestore
      .collection('ebooks')
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
    this.ebooks$.subscribe(ebooks => {
      this._ebooks = ebooks;
      this.applyFilters();
    });

    this.ar.queryParams.subscribe(params => {
      if (params['search']) {
        this.filterProperty('title', params['search']);
      }
    });
  }

  applyFilters() {
    this._filteredResearches = _.filter(
      this._researches,
      _.conforms(this.filters)
    );
    this._filteredJournals = _.filter(this._journals, _.conforms(this.filters));
    this._filteredEbooks = _.filter(this._ebooks, _.conforms(this.filters));
  }

  filterProperty(property: string, rule: any) {
    this.filters[property] = val => val == rule;
    this.applyFilters();
  }

  public removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }

  // GETTERS
  public get researches() {
    return this._filteredResearches;
  }
  public get journals() {
    return this._filteredJournals;
  }
  public get ebooks() {
    return this._filteredEbooks;
  }
}
