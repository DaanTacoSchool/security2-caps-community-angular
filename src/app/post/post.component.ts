import { Component, OnInit } from '@angular/core';
import {Post} from "./post.model";
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[];

  constructor(public postService: PostService) { }

  ngOnInit() {

   this.postService.getPosts()
   .then((posts) => {
    this.posts = posts;
   })
   .catch((error) => {
     console.log(error);
   });
  }
}
