import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from './like.service';
import { Like } from '../shared/like.model';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() postId: string;

  private numberOfLikes: number;

  constructor(private likeService: LikeService) { }

  ngOnInit() {
    // Get the number of likes on a post, to dispplay
    this.likeService.getLikesOfPost(this.postId)
      .then(likes => {
        this.numberOfLikes = likes.length;
      })
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
