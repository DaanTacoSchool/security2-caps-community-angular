import { Component, OnInit } from '@angular/core';
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
  posts: Post[] =[];
  commentsInPost: Comment[] =[];
  postsSubscription: Subscription;
  commentsInPostSubscription: Subscription;
  private showErrors = environment.displayErrors;
  constructor(private postService: PostService, private commentService: CommentService) { }

  ngOnInit() {
    this.postsSubscription = this.postService.postsChanged
        .subscribe(
            (posts: Post[]) => {
              this.posts = posts;
            }
        );
    // might be unnecessary
    this.postService.getPosts()
        .then(posts => {this.posts = posts; })
        .catch(error => this.showErrors?console.log(error):false);
  }



}
