import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Post } from "./post.model";
import { Http, Headers } from '@angular/http';
import { Comment} from "../comment/comment.model";
import { User } from "../shared/user.model";
import { Like } from "../shared/like.model";
import { environment } from "../../environments/environment";
import { BaseService } from "../services/base.service";
import { AuthService } from "../services/auth.service";


@Injectable()
export class PostService extends BaseService {
  private serverUrl = environment.serverUrl + '/posts'; // URL to web api
  private userUrl = environment.serverUrl + '/users'; // URL to user route
  private posts: Post[] = [];
  public postsChanged = new Subject<Post[]>();
  public postChanged = new Subject<Post>();
  private debug = environment.debug;
  private showErrors = environment.displayErrors;

  constructor(authService: AuthService, private http: Http) {
    super(authService);
  }

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
    const usr:User= new User(0,'', '', '', '', '', '' , []);
    const comm:Comment = new Comment('commid','postid','the comment content', usr);
    const comArr:Comment[] = [comm,comm];
    const tstLike:Like = new Like('id','userid', ' postid');
    return new Post('testid','title', 'description','madeby', 'imageurl', comArr,usr,[tstLike]);
  }
  /* ---- for development only -----*/


  public getPosts(): Promise<Post[]> {
    return this.http.get(this.serverUrl, this.requestOptionsOld())
      .toPromise()
      .then(response => {
        this.posts = response.json() as Post[];
        return this.posts;
      })
      .catch(error => {
        this.debug?console.log(error):false;
        return  this.handleError(error);
      });
  }

  public getOwnPosts(userId: string): Promise<Post[]> {
    return this.http.get(this.userUrl + '/posts/' + userId , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.posts = response.json() as Post[];
        return this.posts;
      })
      .catch(error => {
        this.debug?console.log(error):false;
        return  this.handleError(error);
      });
  }

  getPost(postId: string): Promise<Post> {
    return this.http.get(this.serverUrl + '/' + postId, this.requestOptionsOld())
      .toPromise()
      .then(response => {
        // TODO: maybe subscription .next?
        this.debug?console.log(response.json()):false;
        return response.json() as Post;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  createPost(post: Post) {
    const d = post;
    return this.http.post(this.serverUrl , d, this.requestOptionsOld())
      .toPromise()
      .then(response => {
        const tmpPost = response.json() as Post;
        this.posts.push(tmpPost);
        this.postsChanged.next(this.posts.slice());
        this.postChanged.next(tmpPost);
        return tmpPost;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  // moved to comment service
  /*
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
*/

  updatePost(postId: string, newPost: Post) {
    // use post id in case somehow the new post does not have one
    return this.http.put(this.serverUrl + '/' + postId , newPost, this.requestOptionsOld())
      .toPromise()
      .then(response => {
        const arrayIndex = this.posts.findIndex(x=>x._id === postId);
        this.posts[arrayIndex] = response.json() as Post;
        this.postsChanged.next(this.posts.slice());
        this.postChanged.next(response.json() as Post); // TODO confirm if this works as supposed to
        return response.json() as Post;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(this.serverUrl + '/' + postId, this.requestOptionsOld())
      .toPromise()
      .then(response => {
        const arrayIndex = this.posts.findIndex(x => x._id === postId);
        delete this.posts[arrayIndex];
        this.postsChanged.next(this.posts.slice());
        return response.json();
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

  // Subscriber helper methods
  getPostsInMemory(){
    return this.posts;
  }
  updatePostInMemory(tPost:Post){
    console.log('this should be visible once');
    const arrayIndex = this.posts.findIndex(x=>x._id === tPost._id);
    this.posts[arrayIndex] = tPost;
    this.postsChanged.next(this.posts.slice());
    this.postChanged.next(tPost);
  }

}
