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
  constructor(private postService: PostService, private commentService: CommentService) { }

  ngOnInit() {
    this.postSubscription = this.postService.postChanged
        .subscribe(
            (post: Post) => {
              this.post = post;
              console.log('comments'); console.log(this.comments);
            }
        );
    // might be unnecessary
    // this.postService.getPost(this.post._id)
    this.postService.getPost(this.postId)
        .then(post => {this.post = post;
        console.log('commentlist-getpost: post, comments');console.log(this.post);console.log(this.post.comments); })
        .catch(error => this.showErrors?console.log(error):false);

    this.commentsInPostSubscription = this.commentService.commentsInPostChanged
      .subscribe(
        (comments: Comment[]) => {
          this.commentsInPost = comments;
        }
      );
    this.commentService.getAllCommentsInPost(this.postId)
    // this.commentService.getAllCommentsInPost(this.post._id)
      .then(comments => {this.commentsInPost = comments; console.log('comment-list get all comments:'); console.log(comments); })
      .catch(error => this.showErrors?console.log(error):false);


  }



}
