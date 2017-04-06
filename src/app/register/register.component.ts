import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  passwordForm: FormGroup;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;
  registrationFailed = false;

  static passwordMatch(passwordForm: FormGroup) {
    return passwordForm.controls['password'].value === passwordForm.controls['confirmPassword'].value ? null : { matchingError: true };
  }

  static validYear(birthYearCtrl: FormControl) {
    const nextYear = new Date().getFullYear() + 1;
    return birthYearCtrl.value >= 1900 && birthYearCtrl.value < nextYear ? null : { invalidYear: true };
  }

  constructor(formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = formBuilder.control('', [ Validators.required, Validators.minLength(3) ]);
    this.passwordCtrl = formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = formBuilder.control('', Validators.required);
    this.birthYearCtrl = formBuilder.control('', [ Validators.required, RegisterComponent.validYear ]);
    this.passwordForm = formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validator: RegisterComponent.passwordMatch
    });
    this.userForm = formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.loginCtrl.value, this.passwordCtrl.value, this.birthYearCtrl.value)
      .subscribe(user => {
        this.router.navigate([ '/' ]);
      }, error => {
        this.registrationFailed = true;
      });
  }
}
