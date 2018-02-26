import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {}

  public removeUserToken(): void {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
  }

  public setUserToken(token: string, rememberMe: boolean): void {
      if(rememberMe){
          localStorage.setItem('token', token);
      } else {
          sessionStorage.setItem('token', token);
      }
  }

  public getUserToken(): string {
      const token = sessionStorage.getItem('token');
      if(token == null || token === "") {
        return localStorage.getItem('token');
      }
      return token;
  }

    public removeUserGUID(): void {
        localStorage.removeItem('user_guid');
        sessionStorage.removeItem('user_guid');
    }

    public setUserGUID(guid: string, rememberMe: boolean): void {
        if(rememberMe){
            localStorage.setItem('user_guid', guid);
        } else {
            sessionStorage.setItem('user_guid', guid);
        }
    }

    public getUserGUID(): string {
        const guid = sessionStorage.getItem('user_guid');
        if(guid == null || guid === "") {
            return localStorage.getItem('user_guid');
        }
        return guid;
    }

    public isUserLoggedIn(): boolean {
        return this.getUserToken() != null && this.getUserToken() !== "";
    }
}
