import { Component, OnInit } from '@angular/core';
import {Post} from "../post.model";
import {Subscription} from "rxjs/Subscription";
import {PostService} from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] =[];
  postsSubscription: Subscription;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postsSubscription = this.postService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );
    this.postService.getPosts()
      .then(posts => {this.posts = posts; })
      .catch(error => console.log(error));
  }

}
