import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Login} from "./login.model";
import {AuthService} from "../services/auth.service";
import {isNullOrUndefined} from "util";
import {UserService} from "../services/user.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public modalRef: BsModalRef;
    public login: Login = new Login();
    public loading: boolean = false;
    public error: { error: boolean, message: string };
    private log = environment.log;


  constructor(public authService: AuthService, private userService: UserService) {}

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
                this.authService.setUserGUID(loginResult.user.guid, rememberMe);
            }
            this.loading = false;
            this.modalRef.hide();
        },
        err => {
          this.log?console.log(err):false;
          this.log?console.log(this.error):false;
            this.loading = false;
            this.error = { error: true, message: 'Could not login!'};
        }
    );
  }

  switchRememberMe(checked) {
      this.login.rememberMe = checked;
  }

}
