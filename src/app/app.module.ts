import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostItemComponent } from './post/post-list/post-item/post-item.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostStartComponent } from './post/post-start/post-start.component';
import { PostService } from "./post/post.service";
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CommentItemComponent } from './comment/comment-list/comment-item/comment-item.component';
import { CommentService } from "./comment/comment.service";
import { LikeComponent } from './like/like.component';
import { LikeService } from "./like/like.service";
import { HeaderComponent } from './header/header.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";
import { CommentNewComponent } from './comment/comment-new/comment-new.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./services/user.service";
import { ImageService } from "./services/image.service";
import { LikePageComponent } from './like/like-page/like-page.component';
import { PostOwnComponent } from './post/post-own/post-own.component';
import { ReCaptchaModule } from 'angular2-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    PostItemComponent,
    PostDetailComponent,
    PostStartComponent,
    CommentComponent,
    CommentListComponent,
    CommentItemComponent,
    LikeComponent,
    HeaderComponent,
    PostEditComponent,
    CommentNewComponent,
    LoginComponent,
    LikePageComponent,
    PostOwnComponent
  ],
  entryComponents: [LoginComponent, CommentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ReCaptchaModule
  ],
  providers: [PostService, CommentService, LikeService, AuthService, UserService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
