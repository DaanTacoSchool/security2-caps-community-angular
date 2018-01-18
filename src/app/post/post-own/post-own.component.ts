import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../post.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-post-own',
  templateUrl: './post-own.component.html',
  styleUrls: ['./post-own.component.css']
})

export class PostOwnComponent implements OnInit {
  userId: string;
  posts: Post[];

  private showErrors = environment.displayErrors;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService,) {
  }

  ngOnInit() {

    // let userGuid = this.authService.getUserGUID();
    // this.posts.forEach((post) => {
    //   if (post.user.guid === userGuid) {
    //     this.posts = post;
    //   }
    // });

  }
}
