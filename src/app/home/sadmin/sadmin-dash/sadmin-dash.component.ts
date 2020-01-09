import { Component, OnInit } from '@angular/core';
import {} from 'lodash';
import { Center } from '../../../models/center.model';
import { CenterService } from '../../../shared/center.service';

@Component({
  selector: 'app-sadmin-dash',
  templateUrl: './sadmin-dash.component.html',
  styleUrls: ['./sadmin-dash.component.scss']
})
export class SadminDashComponent implements OnInit {
  centers: Center[];
  constructor(private centerService: CenterService) {}

  ngOnInit() {
    this.centerService.getCenters().subscribe(centers => {
      this.centers = centers;
    });
  }
}
