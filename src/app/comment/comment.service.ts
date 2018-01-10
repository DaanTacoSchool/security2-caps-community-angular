import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Subject} from "rxjs/Subject";
import {Comment} from "./comment.model";
import { Http, Headers } from '@angular/http';
import {Post} from "../post/post.model";
import {PostService} from "../post/post.service";

@Injectable()
export class CommentService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/comments';
  private commentsInPost: Comment[] = [];
  private debug = environment.debug;
  private showErrors = environment.displayErrors;
  public commentsInPostChanged = new Subject<Comment[]>(); // Bugged?

  constructor(private http: Http, private postService: PostService) { }

  // TODO: this retreives all comments in a post. by default in post service only append like 3?
  getAllCommentsInPost(postId: string): Promise<Comment[]> {
    return this.http.get(this.serverUrl + '/post/' + postId, { headers: this.headers }) // ~/comments/:postid
        .toPromise()
        .then(response => {
          this.commentsInPost = response.json() as Comment[];

          this.debug?console.log('commentService-getAllCommentsInPost1'):false;
          this.debug?console.log(this.commentsInPost):false;


          //this.commentsInPostChanged.next(this.commentsInPost.slice());

          this.debug?console.log('commentService-getAllCommentsInPost2'):false;
          this.debug?console.log(this.commentsInPost):false;

          return this.commentsInPost;
        })
        .catch(error => {
          return this.handleError(error);
        });
  }
  createComment(postId: string, comm: Comment) {
    return this.http.post(this.serverUrl +'/p/'+postId, comm) // new/
      .toPromise()
      .then(response => {
        const tmpComment = response.json() as Comment;


        this.commentsInPost.push(tmpComment);
       // this.commentsInPostChanged.next(this.commentsInPost.slice());

       // this.postService.getPost()
        this.debug?console.log('commentService create comment'):false;
        this.debug?console.log(tmpComment):false;

        return tmpComment;
      })
      .catch(error => {
        this.showErrors?console.log('error in create comment:'):false;
        return this.handleError(error);
      });
  }

  /*
  createCommentAndAddToPost(post: Post, comm:Comment) {
    this.debug?console.log(' in create commentand add to post'):false;
    this.debug?console.log(post.comments):false;

    post.comments.push(comm);

    this.debug?console.log('pushed'):false;
    this.debug?console.log(post.comments):false;
  //  let tmpPost = new Post({});
    return this.http.post(this.serverUrl +'/p/'+post._id, [post,comm]) // new/
      .toPromise()
      .then(response => {
        const tmpComment = response.json() as Comment;
        this.commentsInPost.push(tmpComment);
        this.commentsInPostChanged.next(this.commentsInPost.slice());

        this.debug?console.log('commentService crate'):false;
        this.debug?console.log(tmpComment):false;
        this.debug?console.log('gelukt!!!'):false;

        return tmpComment;
      })
      .catch(error => {
        this.showErrors?console.log('errpor in create comment'):false;
        return this.handleError(error);
      });
  }
  */
  private handleError(error: any): Promise<any> {
    // for now always return errormessage. log it if either in debug or errorlogging is enabled the same as in post.service
    this.debug?console.log(error):false;
    this.showErrors?console.log(error):false;
    // TODO: determine wether to return generic error or specific error (if statement w/500 error?)
    return Promise.reject(error.message || error);
  }

}
