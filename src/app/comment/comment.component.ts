import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {Post} from "../post/post.model";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

    this.debug?console.log('post comment component'):false;
    this.debug?console.log(this.postId):false;//id
    // if(this.numComments==null){
    //   this.numComments
    // }
  }

  openModalWithComponent() {
    console.log("dikke test");
    console.log(this.post._id);
    this.bsModalRef = this.modalService.show(CommentListComponent, {class: 'modal-lg'});
    this.bsModalRef.content.post = this.post;
    this.bsModalRef.content.numComment = 0;
    this.bsModalRef.content.postId = this.post._id;
    // this.bsModalRef.content.modalRef = this.bsModalRef;
  }
}
