import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Post } from '../post/post.model';
import { PostEditComponent } from '../post/post-edit/post-edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() post: Post;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(PostEditComponent, {class: 'modal-lg'});
    this.bsModalRef.content.post = new Post("", "", "", "", "", [], null, []);
    this.bsModalRef.content.postId = null;
    this.bsModalRef.content.modalRef = this.bsModalRef;
}

}
