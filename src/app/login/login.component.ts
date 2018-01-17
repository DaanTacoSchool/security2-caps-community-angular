import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Login} from "./login.model";
import {AuthService} from "../services/auth.service";
import {isNullOrUndefined} from "util";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private modalRef: BsModalRef;
  private login: Login = new Login();
  private loading: boolean = false;
  private error: { error: boolean, message: string };

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
      this.error = { error: false, message: ''};
  }

  onSubmit() {
    this.loading = true;
    const rememberMe = this.login.rememberMe;
    // TODO: Handle errors
    this.userService.login(this.login).subscribe(
        loginResult => {
            if (!isNullOrUndefined(loginResult.token) && loginResult.token !== "") {
                this.authService.setUserToken(loginResult.token, rememberMe);
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

  switchRememberMe(checked) {
      this.login.rememberMe = checked;
  }

}
