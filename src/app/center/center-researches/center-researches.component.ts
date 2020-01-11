import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Research } from '../../models/research.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-center-researches',
  templateUrl: './center-researches.component.html',
  styleUrls: ['./center-researches.component.scss']
})
export class CenterResearchesComponent implements OnInit {
  researches$: Observable<Research[]>;
  researches: Research[];
  constructor(
    public authService: AuthService,
    private ar: ActivatedRoute,
    private router: Router,
    private afFirestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.ar.parent.params.subscribe(params => {
      const id = params['id'];
      this.researches$ = this.afFirestore
        .collection('researches', ref => ref.where('centerID', '==', id))
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
    });
    this.researches$.subscribe(researches => {
      this.researches = researches;
    });
  }

  onAddResearchClick() {
    this.router.navigate(['add'], { relativeTo: this.ar.parent });
  }
}
