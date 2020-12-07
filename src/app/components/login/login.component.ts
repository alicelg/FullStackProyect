import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

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

  constructor(
    private usersService: UsersService
  ) {
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.usersService.login(this.loginForm.value).then(res => {
        console.log(res);
      });
    } else {
      // Si el formulario no es válido marcamos los campos como incorrectos "tocándolos"
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

    }
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


  showPassword(event): void {

    const target = event.target;
    const id = target.getAttribute('id');
    const dataField = target.getAttribute('data-field');

    const passwordInput = document.getElementById(dataField);
    const eye = document.getElementById(id);

    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');

      this.leftArm.classList.remove('password');
      this.leftHand.classList.remove('password');
      this.rightArm.classList.add('password');
      this.rightHand.classList.add('password');

      eye.classList.add('eye_closed');
      eye.classList.remove('eye_open');


    } else {
      passwordInput.setAttribute('type', 'password');

      this.leftArm.classList.add('password');
      this.leftHand.classList.add('password');
      this.rightArm.classList.add('password');
      this.rightHand.classList.add('password');


      eye.classList.add('eye_open');
      eye.classList.remove('eye_closed');

    }

  }

  passwordForgotten(): void { }

  showSignUp(): void { }

}
