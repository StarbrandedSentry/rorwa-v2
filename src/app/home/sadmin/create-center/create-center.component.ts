import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.component.html',
  styleUrls: ['./create-center.component.scss']
})
export class CreateCenterComponent implements OnInit {
  centerFormGroup: FormGroup;
  adminFormGroup: FormGroup;
  confirmFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    /*this.centerFormGroup - this.formBuilder.group({});*/
  }
}
