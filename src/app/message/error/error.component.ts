import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'message-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
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
