import { Component, OnInit } from '@angular/core';
import {Post} from "../post.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../post.service";
import {environment} from "../../../environments/environment";
import {Comment} from "../../comment/comment.model";
import {User} from "../../shared/user.model";
import {Like} from "../../shared/like.model";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
    loading: boolean;
  modalRef: BsModalRef;
  posts: Post[];
  postId: string; // for editing
  post: Post;
  editMode = false;
  postForm: FormGroup;
  private debug = environment.debug;
  private showError = environment.displayErrors;

  private postSubscription: Subscription;


  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) { this.initForm(); }

  ngOnInit() {
    this.loading = false;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.postId = params['id'];
          this.editMode = params['id'] != null; //  != null
        });
    this.postSubscription = this.postService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );
    if(this.postId) {
      this.postService.getPost(this.postId.toString())
        .then(post => this.post = post)
        .catch(error => this.showError?console.log(error):false );
    }
    this.initForm();
  }

  private initForm() {
    let pTitle='', pDesc = '', pImg='';
    let pComments = null, pUser  =null, pLikes = null;

    if (this.editMode) {
      this.postService.getPost(this.postId.toString())
        .then(post => { this.post = post;
          pTitle = this.post.title;
          pDesc = this.post.description;
          pImg = this.post.image_path;
          pComments = this.post.comments?this.post.comments:null;
          pUser = this.post.user?this.post.user:null;
          pLikes = this.post.likes?this.post.likes:null;

        })
        .catch(error => this.debug?console.log(error):false);

    }else{
        this.debug?console.log('creation mode'):false;
    }
    this.postForm = new FormGroup({
      'title': new FormControl(pTitle),
      'description': new FormControl(pDesc),
      'image_path': new FormControl(pImg),
    });

  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    this.loading = true;
    this.debug?console.log('on submit post-edit'):false;
    let tmpId:string;
    let tmpLikes: Like[];
    let tmpComments: Comment[];
    let tmpUser: User;
    if(this.postId === 'new' || this.postId==null){
      tmpId=null;
      tmpComments = [];
      tmpUser=null;
      tmpLikes=[];
    }else{
      tmpId= this.postId;
      tmpComments=this.post.comments;
      tmpUser =  this.post.user;
      tmpLikes = this.post.likes;
    }

    this.debug?console.log(tmpComments):false;
    const newPost = new Post(
      tmpId,
      this.postForm.value['title'],
      this.postForm.value['description'],
      '',
      this.postForm.value['image_path'],
      tmpComments,
      tmpUser,
      tmpLikes
    );
    if ((!isNullOrUndefined(this.postId) && this.postId !== '') || this.editMode) {
        this.debug?console.log('to postservice updatepost'):false;
        this.postService.updatePost(this.postId,newPost).then((post)=>{
            this.loading = false;
            this.modalRef.hide();
        })
        .catch((error) => {
            this.loading = false;
            this.showError?console.log(error):false;
        });
    } else {
      this.debug?console.log('to postservice createpost'):false;
      this.postService.createPost(newPost)
          .then((post)=>{
              this.post = post;
              this.loading = false;
              this.modalRef.hide();
          })
          .catch((error) => {
              this.loading = false;
              this.showError?console.log(error):false;
          });
    }
    this.onCancel();
  }

}
