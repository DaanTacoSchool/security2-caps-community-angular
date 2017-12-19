import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {Subject} from "rxjs/Subject";
import {Post} from "./post.model";
import { Http, Headers } from '@angular/http';


@Injectable()
export class PostService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/decks'; // URL to web api
  private posts: Post[] = [];
  public postsChanged = new Subject<Post[]>();


  constructor(private http: Http) { }

  public getPosts(): Promise<Post[]> {

    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.posts = response.json() as Post[];
        return this.posts;
      })
      .catch(error => {
        console.log(error);
        // TODO do not return error
       return  error;
      });
  }

  public getPostsTest(): Promise<Post[]> {
    return new Promise((resolve,reject)=>{
      const i =2;
      setTimeout(()=>{
        if(i>1){
          resolve([new Post('testid','title', 'description','madeby', 'imageurl', 'commentarray','user')]);
        }else{
          reject();
        }
      },1000);
    });
  }
}
