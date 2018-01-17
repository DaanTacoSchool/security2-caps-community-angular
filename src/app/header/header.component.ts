import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Post } from '../post/post.model';
import { PostEditComponent } from '../post/post-edit/post-edit.component';
import { LoginComponent } from "../login/login.component";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() post: Post;

  constructor(private modalService: BsModalService, public authService: AuthService) { }

  ngOnInit() {
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(PostEditComponent, {class: 'modal-lg'});
    this.bsModalRef.content.post = new Post("", "", "", "", "", [], null, []);
    this.bsModalRef.content.postId = null;
    this.bsModalRef.content.modalRef = this.bsModalRef;
  }

  openLoginModal() {
    const bsModalRef = this.modalService.show(LoginComponent, {class: 'modal-lg'});
    bsModalRef.content.modalRef = bsModalRef;
  }

  logout() {
    this.authService.setUserToken("");
  }

}
