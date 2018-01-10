import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "./comment.model";
import {environment} from "../../environments/environment";
import {CommentService} from "./comment.service";
import {Post} from "../post/post.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  commentsInPost: Comment[];
   @Input() post: Post;
  @Input() postId: string;
  private showErrors = environment.displayErrors;
  private debug = environment.debug;

  constructor(public commentService: CommentService) { }

  ngOnInit() {

    this.debug?console.log('post comment component'):false;
    this.debug?console.log(this.postId):false;//id
    // this.commentService.getAllCommentsInPost(this.postId) //this.post._id this.postId
    //     .then((comments) => {
    //       this.commentsInPost = comments;
    //       this.debug?console.log('comment component comments in post:'):false;
    //       this.debug?console.log(this.commentsInPost):false;
    //
    //     })
    //     .catch((error) => {
    //       this.showErrors?console.log(error):false;
    //     });
  }

}
