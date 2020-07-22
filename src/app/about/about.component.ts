import { Component, OnInit, Inject } from '@angular/core';
import {Leader} from '../shared/leader';
import {LeaderService} from '../service/leader.service';
import {flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class AboutComponent implements OnInit {

  leaders:Leader[];
  leaderrMess:string;
  
  constructor(private leaderservice:LeaderService,
    @Inject('BaseURL')private BaseURL) { }

  ngOnInit() {
  this.leaderservice.getLeaders().subscribe(lead=>  this.leaders=lead,error=>this.leaderrMess=<any>error);
  }
}
