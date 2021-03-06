import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from "./post/post.component";
import {PostStartComponent} from "./post/post-start/post-start.component";
import {PostDetailComponent} from "./post/post-detail/post-detail.component";
import {PostEditComponent} from "./post/post-edit/post-edit.component";
import {PostListComponent} from "./post/post-list/post-list.component";
import {LikePageComponent} from './like/like-page/like-page.component';
import {PostOwnComponent} from './post/post-own/post-own.component';

const appRoutes: Routes = [

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: PostComponent, children: [
  //   { path: '', component: PostStartComponent },
  //   { path: ':id', component: PostDetailComponent },
  //
  // ]},
  { path: '', redirectTo: '/post', pathMatch: 'full' },
  { path: 'post', component: PostComponent, children: [
    // { path: '', component: PostStartComponent },
    { path: '', component: PostListComponent },
    { path: 'new', component: PostEditComponent },
    { path: ':id', component: PostDetailComponent },
    { path: ':id/edit', component: PostEditComponent },
    { path: ':id/details', component: PostDetailComponent },
  ] },
  { path: 'liked', component: LikePageComponent},
    { path: 'own', component: PostOwnComponent },
  // { path: 'view', component: FeedComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
