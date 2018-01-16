import { Component, OnInit } from '@angular/core';
import {Post} from "../post.model";
import {Subscription} from "rxjs/Subscription";
import {PostService} from "../post.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] =[];
  postsSubscription: Subscription;

  private showErrors = environment.displayErrors;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postsSubscription = this.postService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          console.log('Posts changed');
          console.log(posts);
          this.posts = posts;
        }
      );
    this.postService.getPosts()
      .then(posts => {this.posts = posts; })
      .catch(error => this.showErrors?console.log(error):false);
  }

}
