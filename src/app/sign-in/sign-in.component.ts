import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../errorstatematcher';
import { Subject } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  signInButtonText = 'Sign in';
  signInButtonDisabled: boolean;
  errorMessage: Subject<string> = new Subject<string>();

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      'research',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/research.svg')
    );
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['' /*, [Validators.required, Validators.email]*/],
      password: ['' /*, [Validators.required]*/]
    });
  }

  onSignInClick(): void {
    if (
      !this.signInForm.get('email').value ||
      !this.signInForm.get('password').value
    ) {
      this.errorMessage.next('Field values are empty!');
      return;
    }
    this.signInOnProgress();
    this.authService
      .signInUsingEmail(
        this.signInForm.get('email').value,
        this.signInForm.get('password').value
      )
      .then(result => {
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        this.errorMessage.next(error);
      })
      .finally(() => {
        this.signInEnd();
      });
  }

  private signInOnProgress(): void {
    this.signInButtonText = 'Signing in...';
    this.signInButtonDisabled = true;
  }

  private signInEnd(): void {
    this.signInButtonText = 'Sign in';
    this.signInButtonDisabled = false;
  }
}
