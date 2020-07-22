import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {switchMap} from 'rxjs/operators';    
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {comment} from '../shared/usercomment';
import {visibility, flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand(),
    ]
})
export class DishdetailComponent implements OnInit {
    
    //animations..
    visibility='shown';

    //@Input()
    dish:Dish;
    dishIds:string[];
    prev:string;
    next:string;
    dishcopy:Dish;

    errMess:string;
    //reactive comment form
    commentform:FormGroup;
    Comment:comment;
    @ViewChild('cform') commentFormDirective;

    formErrors = {
      'name': '',
      'comment': '',
    };
  
    validationMessages = {
      'name': {
        'required':      'Author Name is required.',
        'minlength':     'Author Name must be at least 2 characters long.',
        'maxlength':     'Author Name cannot be more than 25 characters long.'
      },
      'comment': {
        'required':      'Comment is required.',
        'minlength':     'Comment must be at least 1 word long.',
      },
    };

  constructor(private dishservice:DishService,
    private route:ActivatedRoute,
    private location:Location,
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

createForm():void{
  this.commentform=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      rating:5,
      comment:['',[Validators.required,Validators.minLength(4)]],
  });

  this.commentform.valueChanges.subscribe(data=>this.onValueChanged(data));

  this.onValueChanged();
}


  ngOnInit() {
    this.dishservice.getStringids()
    .subscribe(dishid=>this.dishIds=dishid,error=>this.errMess=<any>error);
    
    //const id=this.route.snapshot.params['id'];
    this.route.params
    .pipe(switchMap((params:Params)=>{this.visibility='hidden';return this.dishservice.getDish(params['id']);}))
    .subscribe(dish=>{this.dish=dish;this.dishcopy=dish;this.setprevnextid(dish.id);this.visibility='shown';},error=>this.errMess=<any>error);
  }

  setprevnextid(id:string){
    let index=this.dishIds.indexOf(id);
    this.prev=this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }


  goBack():void{
    this.location.back();
  }

  onValueChanged(data?: any){
    if(!this.commentform){return;}
  
    const form=this.commentform;
  
    for(let field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //clear if any...
        this.formErrors[field]='';
        const control=form.get(field);
        if(control && control.dirty && !control.valid){
          const messages=this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+' ';
            }
          }
        }
      }
    }
  }
  d=new Date();
  onSubmit(){
    this.Comment=this.commentform.value;
  
    this.dishcopy.comments.push({
      rating:this.Comment.rating,
      comment:this.Comment.comment,
      author:this.Comment.name,
      date:this.d.toISOString(),
    });
    this.dishservice.putDish(this.dishcopy)
    .subscribe(dish=>{this.dish=dish;this.dishcopy=dish},error=>{this.dish=null;this.dishcopy=null;this.errMess=<any>error;});
    console.log(this.Comment);
    this.commentFormDirective.resetForm();
    this.commentform.reset(
      {
        firstname: '',
        rating:5,
        comment:'',
      }
    );
    
  }

}
