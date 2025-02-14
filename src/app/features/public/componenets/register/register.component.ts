import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, RouterOutlet } from "@angular/router";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { UserService } from "../../../../service/user.service";
import { tap } from "rxjs/operators";



@Component({
    selector    : 'page-register',
    imports     : [RouterOutlet, MatCardModule, MatFormFieldModule, MatInputModule, 
                   MatButtonModule, RouterModule, ReactiveFormsModule],
    templateUrl : './register.component.html',
    styleUrl    : './register.component.css'
})

export class RegisterPage {

  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])

  });

constructor(private $userService: UserService, private $router: Router) { }

register() {
  if(this.form.valid) {
    this.$userService.createNewUser({
      userName: this.username.value,
      password: this.password.value

    }).pipe(
      tap(() => this.$router.navigate(['../chat']))
    ).subscribe();
  }
}

get username(): FormControl {
    return this.form.get('username') as FormControl;

}

get password(): FormControl {
    return this.form.get('password') as FormControl;

}

get passwordConfirm(): FormControl {
  return this.form.get('passwordConfirm') as FormControl;

}

}