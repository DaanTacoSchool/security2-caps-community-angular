import { Component, OnInit } from '@angular/core';
import {Post} from "./post.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[];

  constructor() { }

  ngOnInit() {

    // make fake postobject and dump in array
    const tmp = [new Post('testid','title', 'description','madeby', 'imageurl', 'commentarray','user')];
    this.posts = tmp;
  }

}
