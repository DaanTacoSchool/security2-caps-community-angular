import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {}

  public removeUserToken(): void {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
  }

  public setUserToken(token: string, rememberMe: boolean): void {
      console.log(rememberMe);
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
    }

    public setUserGUID(guid: string): void {
        localStorage.setItem('user_guid', guid);
    }

    public getUserGUID(): string {
        return localStorage.getItem('user_guid');
    }

    public isUserLoggedIn(): boolean {
        return this.getUserToken() != null && this.getUserToken() !== "";
    }
}
