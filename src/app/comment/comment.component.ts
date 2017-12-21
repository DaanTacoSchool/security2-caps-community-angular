import { Component, OnInit } from '@angular/core';
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
  post: Post;
  private showErrors = environment.displayErrors;
  private debug = environment.debug;

  constructor(public commentService: CommentService) { }

  ngOnInit() {

    this.commentService.getAllCommentsInPost(this.post._id)
        .then((comments) => {
          this.commentsInPost = comments;
          this.debug?console.log(this.commentsInPost):false;
        })
        .catch((error) => {
          this.showErrors?console.log(error):false;
        });
  }

}
