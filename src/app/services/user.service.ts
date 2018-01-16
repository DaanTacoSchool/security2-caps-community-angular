import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Login} from "../login/login.model";
import {UserResponse} from "../shared/userresponse.model";
import {BaseService} from "./base.service";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/user.model";

@Injectable()
export class UserService extends BaseService{

  constructor(authService: AuthService, private http: HttpClient) {
    super(authService);
  }

  public login(login: Login): Observable<UserResponse> {
      return this.http.post<UserResponse>(`${this.baseUri}/auth/login`, login);
  }

  public logout(): void {
      this.authService.removeUserToken();
  }

  public getUser(guid: string): Observable<User> {
      return this.http.get<User>(`${this.baseUri}/users/${guid}`);
  }

}
