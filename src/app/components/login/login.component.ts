import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  leftArm: HTMLElement;
  rightArm: HTMLElement;
  leftHand: HTMLElement;
  rightHand: HTMLElement;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.leftArm = document.querySelector('.arm');
    this.leftHand = document.querySelector('.hand');
    this.rightArm = document.querySelector('.arm-r');
    this.rightHand = document.querySelector('.hand-r');
  }

  passwordFocus(): void {
    this.leftArm.classList.add('password');
    this.leftHand.classList.add('password');
    this.rightArm.classList.add('password');
    this.rightHand.classList.add('password');
  }

  passwordFocusout(): void {
    this.leftArm.classList.remove('password');
    this.leftHand.classList.remove('password');
    this.rightArm.classList.remove('password');
    this.rightHand.classList.remove('password');
  }

  onSubmit(): void { }

  showPassword(event): void {

    const target = event.target;
    const id = target.getAttribute('id');
    const dataField = target.getAttribute('data-field');

    const passwordInput = document.getElementById(dataField);
    const eye = document.getElementById(id);

    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
      this.rightArm.classList.add('password');
      this.rightHand.classList.add('password');
      eye.classList.add('eye_closed');

    } else {
      passwordInput.setAttribute('type', 'password');
      this.leftArm.classList.add('password');
      this.leftHand.classList.add('password');
      eye.classList.add('eye_open');
    }

  }

  passwordForgotten(): void { }

  showSignUp(): void { }

}
