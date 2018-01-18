import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from './like.service';
import { Like } from '../shared/like.model';
import { Post } from '../post/post.model';
import {AuthService} from "../services/auth.service";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() postId: string;
  @Input() post: Post;

  numberOfLikes: number;
  like: Like;

  constructor(public authService: AuthService, private likeService: LikeService) { }

  ngOnInit() {
    this.numberOfLikes = 0;
    // Get the number of likes on a post, to dispplay
    this.numberOfLikes = this.post.likes.length;

    let userGuid = this.authService.getUserGUID();
    this.post.likes.forEach((like) => {
      if(like.user.guid === userGuid) {
        this.like = like;
      }
    });
  }

  onLike() {
    console.log(this.postId);
    const l = new Like(
      null,
      null,
      this.post
    );

    this.likeService.createLike(l)
      .then(response => {
        this.like = response;
        console.log(response);
        this.numberOfLikes += 1;
      });
  }

  onUnLike() {
    this.likeService.deleteLike(this.like)
      .then(response => {
        this.like = undefined;
        this.numberOfLikes -= 1;
        console.log(response);
      });
  }
}
