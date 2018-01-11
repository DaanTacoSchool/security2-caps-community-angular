import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Subject} from "rxjs/Subject";
import {Comment} from "./comment.model";
import { Http, Headers } from '@angular/http';

@Injectable()
export class CommentService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/comments';
  private commentsInPost: Comment[] = [];
  private debug = environment.debug;
  private showErrors = environment.displayErrors;
  public commentsInPostChanged = new Subject<Comment[]>(); // dont delete

  constructor(private http: Http) { }


  // could be used for detail pages or statistics etc.
  getAllCommentsInPost(postId: string): Promise<Comment[]> {
    return this.http.get(this.serverUrl + '/post/' + postId, { headers: this.headers }) // ~/comments/:postid
        .toPromise()
        .then(response => {
          this.commentsInPost = response.json() as Comment[];

          this.debug?console.log('commentService-getAllCommentsInPost1'):false;
          this.debug?console.log(this.commentsInPost):false;

          //Leave this here for now might be re-enabled when we get to detailed comments
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

        //Leave this here for now might be re-enabled when we get to detailed comments
        // this.commentsInPostChanged.next(this.commentsInPost.slice());
        this.debug?console.log('commentService create comment'):false;
        this.debug?console.log(tmpComment):false;

        return tmpComment;
      })
      .catch(error => {
        this.showErrors?console.log('error in create comment:'):false;
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    this.debug?console.log(error):false;
    this.showErrors?console.log(error):false;
    return Promise.reject(error.message || error);
  }

}
