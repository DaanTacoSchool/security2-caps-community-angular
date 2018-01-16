import {User} from "./user.model";

export class UserResponse {
    constructor(
        public token: string,
        public user: User,
    ) { }
}
