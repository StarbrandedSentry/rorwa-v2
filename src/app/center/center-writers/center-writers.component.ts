import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Center } from 'src/app/models/center.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Writer } from 'src/app/models/writer.model';
import { WriterService } from 'src/app/shared/writer.service';

@Component({
  selector: 'app-center-writers',
  templateUrl: './center-writers.component.html',
  styleUrls: ['./center-writers.component.scss']
})
export class CenterWritersComponent implements OnInit {
  writerFormGroup: FormGroup;
  center$: Observable<Center>;
  center: Center;
  centerID: string;

  constructor(
    public authService: AuthService,
    private ar: ActivatedRoute,
    private afFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public writerService: WriterService
    ) {}

    get writerName() {
      return this.writerFormGroup.get('writerName');
    }

    get education() {
      return this.writerFormGroup.get('education');
    }

    get program() {
      return this.writerFormGroup.get('program');
    }

    get yearGraduated() {
      return this.writerFormGroup.get('yearGraduated');
    }

  ngOnInit() {
    // Get center ID through the params
    this.ar.parent.parent.paramMap.subscribe(params => {
      this.centerID = params.get('id');
      this.center$ = this.afFirestore
        .doc('centers/' + this.centerID)
        .snapshotChanges()
        .pipe(
          map(a => {
            const data = a.payload.data() as Center;
            data.id = a.payload.id;
            return data;
          })
        );
    });
    this.center$.subscribe(center => {
      this.center = center;
    });

    this.writerFormGroup = this.formBuilder.group({
      writerName: ['', [Validators.minLength(8), Validators.required]],
      education: ['', [Validators.minLength(8), Validators.required]],
      program: ['', [Validators.minLength(8), Validators.required]],
      yearGraduated: ['', [Validators.required]]
    });
  }

  onAddWriter(): void {
    const newWriter: Writer = {
      name: this.writerName.value,
      centerID: this.centerID,
      centerName: this.center.name,
      education: this.education.value,
      program: this.program.value,
      yearGraduated: this.yearGraduated.value
    };
    this.writerService.addNewWriter(newWriter);
  }
}
