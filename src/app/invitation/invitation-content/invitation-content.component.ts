import { Component, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Invitation } from '../../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-invitation-content',
  templateUrl: './invitation-content.component.html',
  styleUrls: ['./invitation-content.component.scss']
})
export class InvitationContentComponent implements OnInit {
  passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]$';
  invitation$: Observable<Invitation>;
  accountForm: FormGroup;
  constructor(
    private afFirestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    iconRegistry.addSvgIcon(
      'research',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/research.svg')
    );
  }

  ngOnInit() {
    this.invitation$ = this.activatedRoute.paramMap.pipe(
      take(1),
      switchMap(params => {
        const id = params.get('id');
        return this.afFirestore.doc('invitations/' + id).valueChanges();
      })
    );
    this.invitation$.subscribe(inv => {
      if (inv.status !== 'pending') {
        this.router.navigateByUrl('/invitation/whoops/error');
      }
    });

    this.accountForm = this.formBuilder.group({
      accountEmail: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.passwordRegex)
        ]
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]]
    });
  }

  get accountEmail() {
    return this.accountForm.get('accountEmail');
  }
  get password() {
    return this.accountForm.get('password');
  }
  get confirmPassword() {
    return this.accountForm.get('confirmPassword');
  }
  get name() {
    return this.accountForm.get('name');
  }
}
