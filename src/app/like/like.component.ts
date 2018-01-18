import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from './like.service';
import { Like } from '../shared/like.model';
import { Post } from '../post/post.model';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() postId: string;
  @Input() post: Post;

  numberOfLikes: number;
  liked: boolean;

  constructor(private likeService: LikeService) { }

  ngOnInit() {
    // Get the number of likes on a post, to dispplay
    this.numberOfLikes = this.post.likes.length;
  }

  onLike() {
    console.log(this.postId);
    let l = new Like(
      null,
      null,
      this.post
    );

    this.likeService.createLike(l)
      .then(response => {
        console.log(response);
      });
  }

  onUnLike() {
    
  }
}
