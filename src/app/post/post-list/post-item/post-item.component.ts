import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../post.model";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PostEditComponent } from '../../post-edit/post-edit.component';
import {CommentComponent} from "../../../comment/comment.component";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() numComments?:number = 3;
  bsModalRef: BsModalRef;
  bsModalRefComments: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    console.log(this.post._id);
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(PostEditComponent, {class: 'modal-lg'});
    this.bsModalRef.content.post = this.post;
    this.bsModalRef.content.postId = this.post._id;
    this.bsModalRef.content.modalRef = this.bsModalRef;
  }
  openCommentsModalWithComponent() {
    this.bsModalRefComments = this.modalService.show(CommentComponent, {class: 'modal-lg'});
    this.bsModalRefComments.content.post = this.post;
    this.bsModalRefComments.content.postId = this.post._id;
    this.bsModalRefComments.content.numComments = 0;
    this.bsModalRefComments.content.modalRef = this.bsModalRefComments;
  }

}
