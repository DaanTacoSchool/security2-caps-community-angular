import { Component, OnInit } from '@angular/core';
import {Post} from "./post.model";
import { PostService } from './post.service';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[];
  private showErrors = environment.displayErrors;

  constructor(public postService: PostService) { }

  ngOnInit() {

   this.postService.getPosts()
   .then((posts) => {
    this.posts = posts;
   })
   .catch((error) => {
    this.showErrors?console.log(error):false;
   });
  }
}
