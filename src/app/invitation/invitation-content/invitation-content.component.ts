import { Component, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Invitation, User } from '../../models/user.model';
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
import { UserService } from '../../shared/user.service';
import { AuthService } from '../../shared/auth.service';
import { Center } from '../../models/center.model';
import { CenterService } from '../../shared/center.service';

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

    /*return invalidCtrl /!* || invalidParent*!/;*/
    return control.dirty && form.invalid;
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
  invitation: Invitation;
  invitationID: string;

  //message boiler plate
  createButtonText = 'Create account';
  createButtonDisabled: boolean;
  errorMessage: Subject<string> = new Subject<string>();

  constructor(
    private afFirestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private centerService: CenterService
  ) {
    iconRegistry.addSvgIcon(
      'research',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/research.svg')
    );
  }

  async ngOnInit() {
    this.invitation$ = await this.activatedRoute.paramMap.pipe(
      take(1),
      switchMap(params => {
        const id = params.get('id');
        this.invitationID = params.get('id');
        return this.afFirestore.doc('invitations/' + id).valueChanges();
      })
    );
    this.invitation$.pipe(take(1)).subscribe(inv => {
      if (inv.status !== 'pending') {
        this.router.navigateByUrl('/invitation/whoops/error');
      }
      this.invitation = inv;

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
    this.userService
      .changeInvitationStatus(this.invitationID, 'approved')
      .then(invRes => {
        const newUser: User = {
          email: this.accountEmail.value,
          name: this.name.value,
          role: 2
        };
        this.authService
          .createAccount(newUser, this.password.value, this.invitation.centerID)
          .then(accRes => {
            this.router.navigateByUrl('/home');
          })
          .catch(error => {
            this.errorMessage.next('Something went wrong...');
          });
      })
      .catch(error => {
        console.log(error);
        this.errorMessage.next('Something went wrong...');
      })
      .finally(() => {
        this.creationStop();
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

  private creationStart() {
    this.createButtonText = 'Creating...';
    this.createButtonDisabled = true;
  }

  private creationStop() {
    this.createButtonText = 'Create account';
    this.createButtonDisabled = false;
  }
}
