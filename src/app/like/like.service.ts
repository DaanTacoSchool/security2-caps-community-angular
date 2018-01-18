import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Like } from '../shared/like.model';
import { BaseService } from '../services/base.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LikeService extends BaseService {
  private serverUrl = environment.serverUrl + '/likes';

  private likesOfPost: Like[] = [];
  private likesOfUser: Like[] = [];

  constructor(authService: AuthService, private http: Http) {
    super(authService);
   }

  // Returns all likes of a post
  getLikesOfPost(postId: string): Promise<Like[]> {
    let url = `${this.serverUrl}/${postId}`;

    return this.http.get(url, this.requestOptionsOld())
      .toPromise()
      .then(response => {
        return response.json() as Like[];
      }).catch (error => {
        return this.handleError(error);
      });
  }

  // Returns all likes of a user
  getLikesOfUser(): Promise<Like[]> {
    let url = `${this.serverUrl}/u`;

    return this.http.get(url, this.requestOptionsOld())
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json() as Like[];
      }).catch(error => {
        return this.handleError(error);
      });
  }

  // Create a like
  createLike(like: Like) {
    let body = { post: `${like.post._id}`};
    return this.http.post(this.serverUrl, body, this.requestOptionsOld())
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
    return this.http.delete(url, this.requestOptionsOld())
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
