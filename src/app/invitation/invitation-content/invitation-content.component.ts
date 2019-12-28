import { Component, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Invitation } from '../../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { checkEmail, checkPasswords } from '../../validators';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-invitation-content',
  templateUrl: './invitation-content.component.html',
  styleUrls: ['./invitation-content.component.scss']
})
export class InvitationContentComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
  invitation$: Observable<Invitation>;
  accountForm: FormGroup;

  //message boiler plate
  createButtonText = 'Create account';

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

      this.accountForm = this.formBuilder.group(
        {
          accountEmail: [
            '',
            [Validators.required, Validators.email, checkEmail(inv.email)]
          ],
          password: [
            '',
            [Validators.required, Validators.pattern(this.passwordRegex)]
          ],
          confirmPassword: ['', [Validators.required]],
          name: ['', [Validators.required]]
        },
        { validators: checkPasswords }
      );
    });
  }

  onCreateClick() {
    console.log('SNIPER');
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
