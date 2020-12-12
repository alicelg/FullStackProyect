import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('content') content;
  modalRef: NgbModalRef;

  loginForm: FormGroup;
  signupForm: FormGroup;


  leftArm: HTMLElement;
  rightArm: HTMLElement;
  leftHand: HTMLElement;
  rightHand: HTMLElement;

  action: string;

  constructor(
    private usersService: UsersService,
    private modal: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,

  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.signupForm = new FormGroup({
      nickname: new FormControl('toni', [Validators.required]),
      email: new FormControl('alil@gs.es', [Validators.email, Validators.required]),
      password: new FormControl('123456Az', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]),
      passwordConfirm: new FormControl('123456Az', [Validators.required])
    });


    this.action = this.activatedRoute.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.leftArm = document.querySelector('.arm');
    this.leftHand = document.querySelector('.hand');
    this.rightArm = document.querySelector('.arm-r');
    this.rightHand = document.querySelector('.hand-r');
  }

  login(): void {
    if (this.loginForm.valid) {
      this.usersService.login(this.loginForm.value).then(res => {
        const currentUser: User = JSON.parse(this.utilsService.b64DecodeUnicode(res.token.split('.')[1]));
        currentUser.token = res.token;
        this.usersService.isLogged = currentUser;
        this.router.navigate(['usuario', currentUser.id]);

      });
    } else {
      // Si el formulario no es válido marcamos los campos como incorrectos "tocándolos"
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  signup(): void {
    if (this.signupForm.valid) {
      const newUser = { ...this.signupForm.value };
      delete newUser.passwordConfirm;
      this.usersService.signup(newUser).then(res => {
        this.router.navigate(['/login']);
      }).catch(res => {
        alert('Mijito, estás mal en la vida, ya tienes cuenta.');
      }
      );
    } else {
      // Si el formulario no es válido marcamos los campos como incorrectos "tocándolos"
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
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

    this.passwordCheck();
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

  public passwordCheck(): void {
    if (this.signupForm.get('password').value !== this.signupForm.get('passwordConfirm').value
      && !this.signupForm.get('password').invalid) {
      this.signupForm.get('passwordConfirm').setErrors({ notMatch: true });
    }
  }

  passwordForgotten(): void {
    alert('¡Malparido!, que se cree una nueva cuenta');
  }

  showPasswordForgottenModal(): void {
    if (!this.modal.hasOpenModals()) {
      this.modalRef = this.modal.open(this.content, { ariaLabelledBy: 'password-forgotten', size: 'l', centered: true });
    }
  }



}
