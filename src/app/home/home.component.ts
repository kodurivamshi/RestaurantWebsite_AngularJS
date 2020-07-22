import { Component, OnInit ,Inject} from '@angular/core';
import {Dish}  from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../service/promotion.service';
import {LeaderService} from '../service/leader.service';
import {Leader} from '../shared/leader';
import {flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  leader: Leader;

  disherrMess:string;
  promoerrMess:string;
  leaderrMess:string;

  constructor(private dishservice:DishService,
    private promotionservice:PromotionService,
    private leaderservice:LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish=>this.dish=dish,errorMsg=>this.disherrMess=<any>errorMsg);
    this.promotionservice.getPromoteFeaturedDish().subscribe(promote=>this.promotion=promote,errorMsg=>this.promoerrMess=<any>errorMsg);
    this.leaderservice.getFeaturedLeader().subscribe(lead=>this.leader=lead,errorMsg=>this.leaderrMess=<any>errorMsg);
  }

}
