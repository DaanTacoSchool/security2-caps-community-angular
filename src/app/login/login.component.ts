import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Login} from "./login.model";
import {AuthService} from "../services/auth.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _authService: AuthService;
  private modalRef: BsModalRef;
  private login: Login = new Login();
  private loading: boolean = false;
  private error: { error: boolean, message: string };

  constructor(authService: AuthService) {
      this._authService = authService;
  }

  ngOnInit() {
      this.error = { error: false, message: ''};
  }

  onSubmit() {
    this.loading = true;
    // TODO: Handle errors
    this._authService.login(this.login).subscribe(
        loginResult => {
            if (!isNullOrUndefined(loginResult.token) && loginResult.token !== "") {
                this._authService.setUserToken(loginResult.token);
            }
            this.loading = false;
            this.modalRef.hide();
        },
        err => {
            this.loading = false;
            this.error = { error: true, message: 'Could not login!'};
        }
    );
  }

}
