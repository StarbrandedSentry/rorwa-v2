import { Component, OnInit } from '@angular/core';
import {} from 'lodash';
import { Center } from '../../../models/center.model';
import { CenterService } from '../../../shared/center.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sadmin-dash',
  templateUrl: './sadmin-dash.component.html',
  styleUrls: ['./sadmin-dash.component.scss']
})
export class SadminDashComponent implements OnInit {
  constructor(public centerService: CenterService) {}

  ngOnInit() {}
}
