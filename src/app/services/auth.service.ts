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
