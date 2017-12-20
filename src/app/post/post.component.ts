import { Component, OnInit } from '@angular/core';
import {Post} from "./post.model";
import { PostService } from './post.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[];

  constructor(public postService: PostService) { }

  ngOnInit() {

   this.postService.getPostsTest()
   .then((posts) => {
    this.posts = posts;
   })
   .catch((error) => {
     console.log(error);
   })
  }

}
