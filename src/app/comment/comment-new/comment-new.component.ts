import {Component, Input, OnInit} from '@angular/core';
import { Comment} from "../comment.model";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../comment.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post} from "../../post/post.model";
import {PostService} from "../../post/post.service";

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {
 comment: Comment;
  @Input() postId: string;
  @Input() post: Post;
  commentForm: FormGroup;
  private debug = environment.debug;
  private showError = environment.displayErrors;
  constructor(private commentService: CommentService,
              private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    const content='';
    this.debug?console.log('creation mode'):false;
    this.commentForm = new FormGroup({
      'content': new FormControl(content)
    });

  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    this.debug?console.log('on submit new comment'):false;
    const newComment = new Comment(
      null,
      this.postId,
      this.commentForm.value['content'],
      null
    );

    this.postService.getPost(this.postId)
      .then(post => {this.post = post;
        this.debug?console.log('commentnew-getpost: post, comments'):false;
        this.debug?console.log(this.post):false;
        this.debug?console.log(this.post.comments):false;
        this.debug?console.log('to commentService createComment'):false;

          //this.commentService.createComment(this.postId, newComment)
       if(!this.post.comments){
         this.post.comments= [newComment];
       }
          this.commentService.createComment(this.postId, newComment)
          .then((comment)=>{ this.comment = comment; this.debug?console.log('comment-new:'):false; this.debug?console.log(comment):false;})
          .catch((error) => { this.showError?console.log(error):false;});
      })
      .catch(error => this.showError?console.log(error):false);
  //  this.onCancel();
  }

}
