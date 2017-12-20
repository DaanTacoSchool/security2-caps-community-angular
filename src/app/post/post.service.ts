import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {Subject} from "rxjs/Subject";
import {Post} from "./post.model";
import { Http, Headers } from '@angular/http';
import { Comment} from "../comment/comment.model";
import {User} from "../shared/user.model";


@Injectable()
export class PostService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/posts'; // URL to web api
  private posts: Post[] = [];
  public postsChanged = new Subject<Post[]>();
  public postChanged = new Subject<Post>();


  constructor(private http: Http) { }

  /* ---- for development only -----*/
  public getPostsTest(): Promise<Post[]> {
    return new Promise((resolve,reject)=>{
      const i =2;
      setTimeout(()=>{
        if(i>1){
          const postTstArr: Post[] = [this.getPostWithCommentsTest(), this.getPostWithCommentsTest()];
          resolve(postTstArr);
        }else{
          reject();
        }
      },1000);
    });
  }
  /* ---- for development only -----*/

  /* ---- for development only -----*/
  getPostWithCommentsTest():Post{
    const usr:User= new User('123456789', 'Hebury', 'Ruben Hensen', 'Waalwijk', 'Nederland', 'Hogeschoollaan', '4954', 'hebury@gmail.com');
    const comm:Comment = new Comment('123456','1234','the comment content', usr);
    const comArr:Comment[] = [comm,comm];
    return new Post('1234','Polaroid', 'Polaroid foto','Hebury', 'imageurl', comArr,usr);
  }
  /* ---- for development only -----*/


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

  createPost(post: Post) {

    const d = post;

    return this.http.post(this.serverUrl , d)
      .toPromise()
      .then(response => {
        const tmpPost = response.json() as Post;
        this.posts.push(tmpPost);
        this.postsChanged.next(this.posts.slice());
        return tmpPost;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }


  addCommentToPost(post: Post, comment: Comment) {
    const d = post;
    const c = comment;
    d.comments.push(c);
    // calls the updatepost method in api
    return this.http.put(this.serverUrl + '/' + d._id , d)
      .toPromise()
      .then(response => {
        const tPost= response.json() as Post;
        this.postChanged.next(tPost);
        return tPost;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updatePost(postId: string, newPost: Post) {
    // use post id in case somehow the new post does not have one
    return this.http.put(this.serverUrl + '/' + postId , newPost)
      .toPromise()
      .then(response => {
        const arrayIndex = this.posts.findIndex(x=>x._id === postId);
        this.posts[arrayIndex] = response.json() as Post;
        this.postsChanged.next(this.posts.slice());
        return response.json() as Post;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(this.serverUrl + '/' + postId, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.postsChanged.next(this.posts.slice());
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
