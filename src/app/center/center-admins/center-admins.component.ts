import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Invitation, User } from '../../models/user.model';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../../shared/user.service';
import { Center } from '../../models/center.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-center-admins',
  templateUrl: './center-admins.component.html',
  styleUrls: ['./center-admins.component.scss']
})
export class CenterAdminsComponent implements OnInit {
  admins$;
  admins: User[];
  centerID: string;
  center$;
  center: Center;
  invitations$: Observable<Invitation[]>;
  inviteForm: FormGroup;

  // messages boiler plate
  errorMsg: Subject<string> = new Subject<string>();
  successMsg: Subject<string> = new Subject<string>();
  inviteButtonText = 'Invite';
  isInviting = false;

  constructor(
    private ar: ActivatedRoute,
    private afFirestore: AngularFirestore,
    private userService: UserService,
    private formBuilder: FormBuilder
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
    this.invitations$ = this.ar.parent.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.afFirestore
          .collection('invitations', ref =>
            ref.where('centerID', '==', id).where('status', '==', 'pending')
          )
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const data = a.payload.doc.data() as Invitation;
                data.id = a.payload.doc.id;
                return data;
              })
            )
          );
      })
    );
    this.ar.parent.params.subscribe(params => {
      this.center$ = this.afFirestore
        .doc('centers/' + params['id'])
        .snapshotChanges()
        .pipe(
          map(a => {
            const data = a.payload.data() as Center;
            data.id = a.payload.id;
            return data;
          })
        );
    });
    this.admins$.subscribe(admins => {
      this.admins = admins;
    });
    this.center$.subscribe(center => {
      this.center = center;
    });
    this.invitations$.subscribe(invitations => console.log(invitations));
    this.inviteForm = this.formBuilder.group({
      email: ['', [Validators.email]]
    });
  }

  onInviteClick() {
    const newInvitation: Invitation = {
      centerID: this.centerID,
      centerName: this.center.name,
      email: this.email.value,
      invitationType: 1,
      status: 'pending'
    };
    this.inviteAdminStart();
    this.userService
      .createInvitation(newInvitation)
      .then(res => {
        this.successMsg.next(
          /*TODO: CHANGE LINK FOR PRODUCTION*/
          'Successfully invited!\n' +
            'https://rorwa-v2.firebaseapp.com//invitation/' +
            res.id
        );
      })
      .catch(error => {
        this.errorMsg.next('Something went wrong!');
      })
      .finally(() => {
        this.inviteAdminStop();
      });
  }

  inviteAdminStart() {
    this.inviteButtonText = 'Inviting...';
    this.isInviting = true;
  }
  inviteAdminStop() {
    this.inviteButtonText = 'Invite';
    this.isInviting = false;
  }

  get email() {
    return this.inviteForm.get('email');
  }
}
