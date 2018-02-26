import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BaseService } from "./base.service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Image } from "../shared/image.model";

@Injectable()
export class ImageService extends BaseService{

    constructor(authService: AuthService, private http: HttpClient) {
        super(authService);
    }

    public uploadImage(formData: FormData): Observable<Image> {
        return this.http.post<Image>(`${this.baseUri}/images`, formData, this.requestOptions());
    }

}
