import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../comment.model";
import {Subscription} from "rxjs/Subscription";
import {environment} from "../../../environments/environment";
import {PostService} from "../../post/post.service";
import {CommentService} from "../comment.service";
import {Post} from "../../post/post.model";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() post: Post;
  @Input() postId: string;
  @Input() comments: Comment[];
 // post: Post;
  commentsInPost: Comment[] =[];
  postSubscription: Subscription;
  commentsInPostSubscription: Subscription;
  private showErrors = environment.displayErrors;
  private debug = environment.debug;
  constructor(private postService: PostService, private commentService: CommentService) { }

  ngOnInit() {
    this.postSubscription = this.postService.postChanged
        .subscribe(
            (post: Post) => {
              this.post = post;
              this.debug?console.log('comments'):false;
              this.debug?console.log(this.comments):false;
            }
        );
    // might be unnecessary
    this.postService.getPost(this.postId)
        .then(post => {this.post = post;
          this.debug?console.log('commentlist-getpost: post, comments'):false;
          this.debug?console.log(this.post):false;
          this.debug?console.log(this.post.comments):false;
        })
        .catch(error => this.showErrors?console.log(error):false);

    this.commentsInPostSubscription = this.commentService.commentsInPostChanged
      .subscribe(
        (comments: Comment[]) => {
          this.commentsInPost = comments;
        }
      );
    this.commentService.getAllCommentsInPost(this.postId)
    // this.commentService.getAllCommentsInPost(this.post._id)
      .then(comments => {this.commentsInPost = comments;
            this.debug?console.log('comment-list get all comments:'):false;
            this.debug?console.log(comments):false;
      })
      .catch(error => this.showErrors?console.log(error):false);


  }



}
