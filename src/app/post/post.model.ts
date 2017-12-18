
export class Post {

  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public made_by: string,
    public image_path: string,
    public comments: string, // will be commentobject
    public user: string // will be userobject
  ) { }

}

