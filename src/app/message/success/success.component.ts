import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'message-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  message: string;
  @Input() message$: Observable<string>;
  constructor() {}

  ngOnInit() {
    this.message$.subscribe(msg => {
      this.message = msg;
    });
  }
  onCloseClick() {
    this.message = '';
  }
}
