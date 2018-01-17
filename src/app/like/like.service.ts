import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Like } from '../shared/like.model';

@Injectable()
export class LikeService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/likes';

  private likesOfPost: Like[] = [];
  private likesOfUser: Like[] = [];

  constructor(private http: Http) { }

  // Returns all likes of a post
  getLikesOfPost(postId: string): Promise<Like[]> {
    let url = `${this.serverUrl}/${postId}`;

    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as Like[];
      }).catch (error => {
        return this.handleError(error);
      });
  }

  // Returns all likes of a user
  getLikesOfUser(userId: string): Promise<Like[]> {
    let url = `${this.serverUrl}/u/${userId}`;

    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as Like[];
      }).catch(error => {
        return this.handleError(error);
      });
  }

  // Create a like
  createLike(like: Like) {
    let body = { user: `${like.userId}`, post: `${like.postId}`};
    return this.http.post(this.serverUrl, body, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as Like;
      }).catch(error => {
        return this.handleError(error);
      });
  } 
  
  // Delete a like
  deleteLike(like: Like) {
    let url = `${this.serverUrl}/${like._id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as string;
      }).catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message);
  }
}
