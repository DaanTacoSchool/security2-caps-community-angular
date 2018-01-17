import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from './like.service';
import { Like } from '../shared/like.model';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() postId: string;

  numberOfLikes: number;

  constructor(private authService: AuthService, private likeService: LikeService) { }

  ngOnInit() {
    this.numberOfLikes = 0;
    // Get the number of likes on a post, to dispplay
    this.likeService.getLikesOfPost(this.postId)
      .then(likes => {
        this.numberOfLikes = likes.length;
      });
  }

  onLike() {
    let l = new Like(
      null,
      null,
      this.postId
    );

    this.likeService.createLike(l)
      .then(response => {
        console.log(response);
      });
  }
}
