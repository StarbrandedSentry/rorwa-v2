import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-center-admins',
  templateUrl: './center-admins.component.html',
  styleUrls: ['./center-admins.component.scss']
})
export class CenterAdminsComponent implements OnInit {
  admins$;
  admins: User[];
  centerID: string;
  constructor(
    private ar: ActivatedRoute,
    private afFirestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.admins$ = this.ar.parent.paramMap.pipe(
      switchMap(params => {
        this.centerID = params.get('id');
        return this.afFirestore
          .collection('centers/' + this.centerID + '/admins')
          .valueChanges();
      })
    );
    this.admins$.subscribe(admins => {
      this.admins = admins;
    });
  }
}
