import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Center } from '../../models/center.model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-center-dash',
  templateUrl: './center-dash.component.html',
  styleUrls: ['./center-dash.component.scss']
})
export class CenterDashComponent implements OnInit {
  center$;
  center: Center;

  constructor(
    private afFirestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.center$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.afFirestore
          .doc('centers/' + id)
          .snapshotChanges()
          .pipe(
            map(a => {
              const data = a.payload.data() as Center;
              data.id = a.payload.id;
              return data;
            })
          );
      })
    );
    this.center$.subscribe(center => {
      this.center = center;
      console.logt;
    });
  }
}
