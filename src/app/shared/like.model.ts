import { Post } from "../post/post.model";
import { User } from "./user.model";


export class Like {

  constructor(
    public _id: string,
    public user: User,
    public post: Post
  ) { }

}

