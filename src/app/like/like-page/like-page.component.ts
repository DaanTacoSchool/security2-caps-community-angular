import { Component, OnInit } from '@angular/core';
import { LikeService } from '../like.service';
import { Like } from '../../shared/like.model';
import { PostService } from '../../post/post.service';
import { Post } from '../../post/post.model';

@Component({
  selector: 'app-like-page',
  templateUrl: './like-page.component.html',
  styleUrls: ['./like-page.component.css']
})
export class LikePageComponent implements OnInit {

  likes: Like[] = [];
  posts: Post[] = [];

  constructor(private likeService: LikeService, private postService: PostService) { }

  ngOnInit() {
      this.likeService.getLikesOfUser()
        .then(likes => {
          this.likes = likes;
          console.log(likes);
            for(let i = 0; i < this.likes.length; i++) {
              this.postService.getPost(this.likes[i].postId)
                .then(post => {
                  this.posts.push(post);
                }).catch((error) => {
                  console.log(error);
                });
            }
        }
      ).catch((error) => {
        console.log(error);
      });
        
      
  }
}
