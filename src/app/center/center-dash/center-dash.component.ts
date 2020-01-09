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
  center$: Observable<Center>;

  constructor(
    private afFirestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('center');
    /*this.center$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log(id);
        return this.afFirestore.doc('centers/' + id).valueChanges();
      })
    );*/
  }
}
