import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {}

  public removeUserToken(): void {
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
