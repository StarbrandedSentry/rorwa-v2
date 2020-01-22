import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../../shared/center.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss']
})
export class CentersComponent implements OnInit {
  constructor(public centerService: CenterService) {}

  ngOnInit() {}
}
