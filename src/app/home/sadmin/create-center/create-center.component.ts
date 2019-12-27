import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenEmail } from '../../../validators';

@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.component.html',
  styleUrls: ['./create-center.component.scss']
})
export class CreateCenterComponent implements OnInit {
  numbersRegex = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
  centerFormGroup: FormGroup;
  adminFormGroup: FormGroup;
  /*confirmFormGroup: FormGroup;*/
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.centerFormGroup = this.formBuilder.group({
      centerName: ['', [Validators.minLength(8), Validators.required]],
      centerDescription: ['', [Validators.minLength(8), Validators.required]],
      centerEstablished: ['', [Validators.required, forbiddenEmail]],
      centerAddress: ['', [Validators.required, Validators.minLength(8)]],
      centerContactNum: [
        '',
        [Validators.required, Validators.pattern(this.numbersRegex)]
      ]
    });
  }

  text() {
    const cDate = Date.now();
    console.log(this.centerFormGroup.get('centerEstablished').value);
    console.log(cDate);
    console.log(this.centerFormGroup.get('centerEstablished').value <= cDate);
  }
}
