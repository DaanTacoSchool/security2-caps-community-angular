import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Post} from "../../post.model";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PostEditComponent } from '../../post-edit/post-edit.component';
import {CommentComponent} from "../../../comment/comment.component";
import {AuthService} from "../../../services/auth.service";
import {PostService} from "../../post.service";

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
  bsModalRefConfirmDelete: BsModalRef;
  constructor(private postService: PostService, private authService: AuthService, private modalService: BsModalService) { } // AuthService is used in the view

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

  openDeleteConfirmationModal(template: TemplateRef<any>) {
      this.bsModalRefConfirmDelete = this.modalService.show(template, {class: 'modal-lg'});
  }

  confirmDelete(): void {
      this.postService.deletePost(this.post._id);
      this.bsModalRefConfirmDelete.hide();
  }

  declineDelete(): void {
      this.bsModalRefConfirmDelete.hide();
  }
}
