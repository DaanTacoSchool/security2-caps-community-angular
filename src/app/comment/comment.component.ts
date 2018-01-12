import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {Post} from "../post/post.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
   @Input() post: Post;
   @Input() postId: string;
   @Input() numComments: number;
  //private showErrors = environment.displayErrors;
  private debug = environment.debug;

  constructor() { }

  ngOnInit() {

    this.debug?console.log('post comment component'):false;
    this.debug?console.log(this.postId):false;//id
    // if(this.numComments==null){
    //   this.numComments
    // }
  }

}
