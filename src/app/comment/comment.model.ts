
import {User} from "../shared/user.model";

export class Comment {

  constructor(
    public _id: string,
    public postId: string,
    public content: string,
    public user: User, // will be userobject
  ) { }

}

