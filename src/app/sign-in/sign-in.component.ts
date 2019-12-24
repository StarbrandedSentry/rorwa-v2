import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../errorstatematcher';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  errorMessage: Subject<string> = new Subject<string>();
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
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
    if (!this.signInForm.get('email').value) {
      this.errorMessage.next('Field values are empty!');
    }
  }
}
