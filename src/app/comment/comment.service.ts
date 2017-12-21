import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Subject} from "rxjs/Subject";
import { Http, Headers } from '@angular/http';

@Injectable()
export class CommentService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/comments';
  private commentsInPost: Comment[] = [];
  private debug = environment.debug;
  private showErrors = environment.displayErrors;
  public commentsInPostChanged = new Subject<Comment[]>();

  constructor(private http: Http) { }

  // TODO: this retreives all comments in a post. by default in post service only append like 3?
  getAllCommentsInPost(postId: string): Promise<Comment[]> {
    return this.http.get(this.serverUrl + '/' + postId, { headers: this.headers }) // ~/comments/:postid
        .toPromise()
        .then(response => {
          this.commentsInPost = response.json() as Comment[];
          this.commentsInPostChanged.next(this.commentsInPost.slice());
          this.debug?console.log(this.commentsInPost):false;
          return this.commentsInPost;
        })
        .catch(error => {
          return this.handleError(error);
        });
  }

  private handleError(error: any): Promise<any> {
    // for now always return errormessage. log it if either in debug or errorlogging is enabled
    this.debug?console.log(error):false;
    this.showErrors?console.log(error):false;
    // TODO: determine wether to return generic error or specific error (if statement w/500 error?)
    return Promise.reject(error.message || error);
  }

}
