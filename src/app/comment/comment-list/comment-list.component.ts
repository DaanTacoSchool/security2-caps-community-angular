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
  @Input() numComments: number;
  comments: Comment[];
  private showErrors = environment.displayErrors;
  private debug = environment.debug;
  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postService.getPost(this.postId)
        .then(post => {
          //trunc array

          console.log('numcomments:'+this.numComments);
          console.log(this.post.comments.length);
          console.log(post.comments.length-(this.numComments?this.numComments:post.comments.length) + ' -' +  (post.comments.length-1));

          const comments = post.comments.slice((
            post.comments.length-(this.numComments?this.numComments:post.comments.length))
          );

          //the order of this is important, this order will minimize the time the full comment list is visible on update
          post.comments =comments;
          this.post =post;
          console.log(comments);
          console.log(this.post.comments.length);

          this.debug?console.log('commentlist-getpost: post, comments'):false;
          this.debug?console.log(this.post):false;
          this.debug?console.log(this.post.comments):false;

        })
        .catch(error => this.showErrors?console.log(error):false);

  }

}
