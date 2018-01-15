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
    if(this.postId){
      this.postId = this.post._id;
    }
    this.postService.getPost(this.postId)
        .then(post => {
          let comments;
          //check wther to show all comments or set amounnt
          if(this.numComments!==0) {
            comments = post.comments.slice((
              post.comments.length - (this.numComments ? this.numComments : post.comments.length))
            );
            post.comments =comments;
          }else{
            this.debug?console.log('show all comments'):false;
          }
          this.post =post;
        })
        .catch(error => this.showErrors?console.log(error):false);

  }

}
