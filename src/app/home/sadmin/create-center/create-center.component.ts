import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenDate } from '../../../validators';
import { Subject } from 'rxjs';
import { Center } from '../../../models/center.model';
import { CenterService } from '../../../shared/center.service';
import { UserService } from '../../../shared/user.service';
import { Invitation, User } from '../../../models/user.model';

@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.component.html',
  styleUrls: ['./create-center.component.scss']
})
export class CreateCenterComponent implements OnInit {
  numbersRegex = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
  centerFormGroup: FormGroup;
  adminFormGroup: FormGroup;
  confirmButtonText = 'Confirm';

  //MESSAGE BOILER PLATE
  isCreating: boolean;
  errorMessage: Subject<string> = new Subject<string>();
  successMessage: Subject<string> = new Subject<string>();

  /*confirmFormGroup: FormGroup;*/
  constructor(
    private formBuilder: FormBuilder,
    private centerService: CenterService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.centerFormGroup = this.formBuilder.group({
      centerName: ['', [Validators.minLength(8), Validators.required]],
      centerDescription: ['', [Validators.minLength(8), Validators.required]],
      centerEstablished: ['', [Validators.required, forbiddenDate]],
      centerAddress: ['', [Validators.required, Validators.minLength(8)]],
      centerContactNum: [
        '',
        [Validators.required, Validators.pattern(this.numbersRegex)]
      ]
    });
    this.adminFormGroup = this.formBuilder.group({
      adminEmail: ['', [Validators.email, Validators.required]]
    });
  }

  get centerName() {
    return this.centerFormGroup.get('centerName');
  }
  get centerDescription() {
    return this.centerFormGroup.get('centerDescription');
  }
  get centerEstablished() {
    return this.centerFormGroup.get('centerEstablished');
  }
  get centerAddress() {
    return this.centerFormGroup.get('centerAddress');
  }
  get centerContactNum() {
    return this.centerFormGroup.get('centerContactNum');
  }
  get adminEmail() {
    return this.adminFormGroup.get('adminEmail');
  }

  onConfirmClick(): void {
    this.createCenterOnProgress();
    const newCenter: Center = {
      name: this.centerName.value,
      description: this.centerDescription.value,
      dateEstablished: this.centerEstablished.value,
      address: this.centerAddress.value,
      contactNumber: this.centerContactNum.value,
      memberCount: 0,
      adminCount: 0,
      researchCount: 0
    };
    this.centerService
      .createCenter(newCenter)
      .then(centerResult => {
        const newInvitation: Invitation = {
          email: this.adminEmail.value,
          centerName: this.centerName.value,
          centerID: centerResult.id,
          invitationType: 1,
          status: 'pending'
        };
        this.userService
          .createInvitation(newInvitation)
          .then(invitationResult => {
            this.createCenterDone();
            /*TODO: CHANGE LINK FOR PRODUCTION*/
            this.successMessage.next(
              'Center created.\nInvitation link is: https://rorwa-v2.firebaseapp.com/invitation/' +
                invitationResult.id
            );
          })
          .catch(error => {
            this.errorMessage.next(error);
            this.createCenterDone();
          });
      })
      .catch(error => {
        this.errorMessage.next(error);
        this.createCenterDone();
      });
  }

  createCenterOnProgress() {
    this.confirmButtonText = 'Creating center...';
    this.isCreating = true;
  }

  createCenterDone() {
    this.confirmButtonText = 'Confirm';
    this.isCreating = false;
  }
}
