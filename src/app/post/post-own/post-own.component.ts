import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post-own',
  templateUrl: './post-own.component.html',
  styleUrls: ['./post-own.component.css']
})

export class PostOwnComponent implements OnInit {
  userId: string;
  posts: Post[] =[];

  private showErrors = environment.displayErrors;
  constructor(private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = params['userid'];
        });
    this.postService.getOwnPosts(this.userId)
      .then(posts => {this.posts = posts; console.log(this.posts); })
      .catch(error => this.showErrors?console.log(error):false);
  }

}
