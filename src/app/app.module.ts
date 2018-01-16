import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, ModalModule  } from 'ngx-bootstrap';

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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HttpModule} from "@angular/http";
import { CommentNewComponent } from './comment/comment-new/comment-new.component';
import { LikePageComponent } from './like/like-page/like-page.component';


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
    LikePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [
    CommentComponent
  ],
  providers: [PostService, CommentService, LikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
