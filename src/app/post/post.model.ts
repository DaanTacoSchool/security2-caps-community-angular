
import {User} from "../shared/user.model";
import {Comment} from "../comment/comment.model";
import {Like} from "../shared/like.model";

export class Post {

  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public made_by: string,
    public image_path: string,
    public comments: Comment[], // will be commentobject
    public user: User, // will be userobject
    public likes: Like[],
  ) { }

  

}

