import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Subject } from "rxjs/Subject";
import { Comment } from "./comment.model";
import { Http } from '@angular/http';
import { AuthService } from "../services/auth.service";
import { BaseService } from "../services/base.service";

@Injectable()
export class CommentService extends BaseService {
  private serverUrl = environment.serverUrl + '/comments';
  private commentsInPost: Comment[] = [];
  private debug = environment.debug;
  private showErrors = environment.displayErrors;
 // public commentsInPostChanged = new Subject<Comment[]>(); // use post subscriber instead

  constructor(authService: AuthService, private http: Http) {
      super(authService);
  }

  createComment(postId: string, comm: Comment) {
    return this.http.post(this.serverUrl +'/p/'+postId, comm, this.requestOptionsOld()) // new/
      .toPromise()
      .then(response => {
        // cast response to comment and push to array
        const tmpComment = response.json() as Comment;
        this.commentsInPost.push(tmpComment);

        //Leave this here for now might be re-enabled when we get to detailed comments
        // this.commentsInPostChanged.next(this.commentsInPost.slice());
        this.debug?console.log('commentService create-comment'):false;
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
