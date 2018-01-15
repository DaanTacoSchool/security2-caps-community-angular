import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserResponse } from "../shared/userresponse.model";
import { BaseService } from "./base.service";
import { Login } from "../login/login.model";

@Injectable()
export class AuthService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public login(login: Login): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUri}/auth/login`, login);
  }

  public logout(): void {
      localStorage.removeItem('token');
  }

  public setUserToken(token: string): void {
      localStorage.setItem('token', token);
  }

  public getUserToken(): string {
      return localStorage.getItem('token');
  }

  public isUserLoggedIn(): boolean {
    return this.getUserToken() != null && this.getUserToken() !== "";
  }
}
