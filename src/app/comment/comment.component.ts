import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {Post} from "../post/post.model";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
   @Input() post: Post;
   @Input() postId: string;
   @Input() numComments: number;
  modalRef: BsModalRef;
  //private showErrors = environment.displayErrors;
  private debug = environment.debug;
  bsModalRef: BsModalRef;


  constructor() { }

  ngOnInit() {

    this.debug?console.log('post comment component'):false;
    this.debug?console.log(this.postId):false;//id
    // if(this.numComments==null){
    //   this.numComments
    // }
  }


}
