import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Subject} from "rxjs/Subject";
import {Comment} from "./comment.model";
import { Http, Headers } from '@angular/http';
import {Post} from "../post/post.model";

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
          console.log('json');
          console.log(response.json());//krijg geen json terugC
          this.commentsInPost = response.json() as Comment[];
          this.debug?console.log('commentService-getAllCommentsInPost1'):false;
          this.debug?console.log(this.commentsInPost):false;
          this.commentsInPostChanged.next(this.commentsInPost.slice());
          this.debug?console.log('commentService-getAllCommentsInPost2'):false;
          this.debug?console.log(this.commentsInPost):false;
          return this.commentsInPost;
        })
        .catch(error => {
          return this.handleError(error);
        });
  }
  createComment(postId: string, comm: Comment) {
    console.log(' in create comment');
    return this.http.post(this.serverUrl +'/'+postId, comm) // new/
      .toPromise()
      .then(response => {
        const tmpComment = response.json() as Comment;
        console.log('commentService crate');
        console.log(tmpComment);
        this.commentsInPost.push(tmpComment);
        this.commentsInPostChanged.next(this.commentsInPost.slice());
        console.log('commentService crate');
        console.log(tmpComment);
        return tmpComment;
      })
      .catch(error => {
        console.log('errpor in create comment');
        return this.handleError(error);
      });
  }
  createCommentAndAddToPost(post: Post, comm:Comment) {
    console.log(' in create commentand add to post');
    console.log(post.comments);
    post.comments.push(comm);
    console.log('pushed');
    console.log(post.comments);
  //  let tmpPost = new Post({});
    return this.http.post(this.serverUrl +'/p/'+post._id, [post,comm]) // new/
      .toPromise()
      .then(response => {
        const tmpComment = response.json() as Comment;
        this.commentsInPost.push(tmpComment);
        this.commentsInPostChanged.next(this.commentsInPost.slice());
        console.log('commentService crate');
        console.log(tmpComment);
        console.log('gelukt!!!');
        return tmpComment;
      })
      .catch(error => {
        console.log('errpor in create comment');
        return this.handleError(error);
      });
  }
  private handleError(error: any): Promise<any> {
    // for now always return errormessage. log it if either in debug or errorlogging is enabled the same as in post.service
    this.debug?console.log(error):false;
    this.showErrors?console.log(error):false;
    // TODO: determine wether to return generic error or specific error (if statement w/500 error?)
    return Promise.reject(error.message || error);
  }

}
