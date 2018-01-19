import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpHeaders } from "@angular/common/http";
import {Headers, RequestOptionsArgs} from '@angular/http';
import { AuthService } from "./auth.service";

@Injectable()
export class BaseService {
  protected baseUri: string;
  protected authService: AuthService;

  constructor(authService: AuthService) {
      this.baseUri = environment.serverUrl;
      this.authService = authService;
  }

    private header: {} = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    protected requestHeaders(): {} {
        const headers = this.header;

        if (this.authService.isUserLoggedIn()) {
            headers['Authorization'] = `Bearer ${this.authService.getUserToken()}`;
        }
        return headers;
    }

    /**
     * @deprecated Use requestOptions()
     */
    protected requestOptionsOld(): RequestOptionsArgs {
        return {
            headers: new Headers(this.requestHeaders()),
        };
    }

    protected requestOptions(): {} {
        const headers: {} = {};
        if (this.authService.isUserLoggedIn()) {
            headers['Authorization'] = `Bearer ${this.authService.getUserToken()}`;
        }

        return {
            headers: new HttpHeaders(headers),
        };
    }

}
