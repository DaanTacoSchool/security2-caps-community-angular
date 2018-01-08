import { Component, OnInit } from '@angular/core';
import {Post} from "../post.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../post.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postId: string; // for editing
  post: Post;
  private debug = environment.debug;
  private showError = environment.displayErrors;
  constructor(private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.postId = params['id'];
        });
    this.postService.getPost(this.postId.toString())
      .then(post => {this.post = post; this.debug?console.log('post in detail: '):false; this.debug?console.log(this.post):false;})
      .catch(error => this.showError?console.log(error):false );
  }

}
