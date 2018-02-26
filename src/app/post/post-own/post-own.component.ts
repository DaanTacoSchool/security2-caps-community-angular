import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-post-own',
  templateUrl: './post-own.component.html',
  styleUrls: ['./post-own.component.css']
})

export class PostOwnComponent implements OnInit {
  posts: Post[] = [];

  private showErrors = environment.displayErrors;
  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService) { }

  ngOnInit() {
    this.postService.getOwnPosts(this.authService.getUserGUID())
      .then(posts => {this.posts = posts; console.log(this.posts); })
      .catch(error => this.showErrors?console.log(error):false);
  }

}
