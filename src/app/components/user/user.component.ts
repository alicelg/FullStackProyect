import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

// import { setInterval } from 'timers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('content') content;

  modalRef: NgbModalRef;
  storyStep: number;
  storyImage: string;
  storiesInterval;
  progressBarInterval;
  currentUser: User;
  action: string;


  favouriteConcepts: any[];
  favouritePost: any[];

  postCreated: any[];

  editForm;
  userId;
  userToEdit: User;

  constructor(
    private modal: NgbModal,
    public usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService,
  ) {
    this.action = this.activatedRoute.snapshot.url[0].path.includes('usuario') ? 'USER' : 'EDIT';
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('userId'));
  }

  ngOnInit(): void {
    this.usersService.currentUser.subscribe(res => {
      this.currentUser = res;
    });

    this.usersService.getConcepts().then(res => {
      this.favouriteConcepts = res.concepts;
    })

    this.usersService.getPost().then(res => {
      this.favouritePost = res.posts;
    })

    this.usersService.getPostCreated().then(res => {
      this.postCreated = res.posts;
    })
  }

  showStories(storyStep): void {
    this.storyStep = storyStep;

    // seleccionamos la miniatura de la story que corresponda segun el step
    const targetElement = document.getElementById('story_' + storyStep);

    // al ejecutarse una story la quitamos el borde para marcar que ya ha sido vista;
    targetElement.classList.remove('instagram_avatar_border');
    targetElement.classList.add('instagram_avatar_noborder');

    // sustituimos la imagen de la modal según el step que corresponda
    this.storyImage = `../../../assets/images/story${storyStep}.png`;

    // lanzamos la modal
    if (!this.modal.hasOpenModals()) {
      this.modalRef = this.modal.open(this.content, { ariaLabelledBy: 'story', size: 's', centered: true });
    }
    this.modalRef.result.then((result) => { }, (reason) => {
      // al cerrar la modal paramos el intervalo de stories
      clearInterval(this.storiesInterval);
      clearInterval(this.progressBarInterval);
    });

    // seleccionamos la barra de carga de la story
    const progressBar = document.getElementById('progressbar');

    // limpiamos el intervalo de barra de carga antes de lanzar uno nuevo para que no se acumulen
    clearInterval(this.progressBarInterval);
    // lanzamos un nuevo intervalo que rellene la barra de progreso
    let i = 0;
    this.progressBarInterval = setInterval(() => {
      i++;
      if (i < 100) {
        progressBar.style.width = i + '%';
      } else {
        clearInterval(this.progressBarInterval);
      }
    }, 60);

    // limpiamos el intervalo de cambio de story antes de lanzar uno nuevo para que no se acumulen
    clearInterval(this.storiesInterval);
    // lanzamos nuevo intervalo para que cambie la storie automaticmente
    this.storiesInterval = setInterval(() => this.showStories(storyStep + 1), 6000);
    // si se ha llegado a la ultima storie vuelve a empezar
    if (storyStep > 5) {
      storyStep = 0;
    }
  }



  stopStories(): void {
    clearInterval(this.storiesInterval);
    clearInterval(this.progressBarInterval);
  }

  editUser(): void {
    this.action = 'EDIT';

    this.userToEdit = this.usersService.isLogged;

    this.editForm = new FormGroup({
      name: new FormControl(this.userToEdit.name),
      surname: new FormControl(this.userToEdit.surname),
      nickname: new FormControl(this.userToEdit.nickname, [Validators.required]),
      country: new FormControl(this.userToEdit.country),
      studies: new FormControl(this.userToEdit.studies),
      linkedin: new FormControl(this.userToEdit.linkedin),
      currentWork: new FormControl(this.userToEdit.current_work)
    });
  }

  sendEditedUser(): void {
    const userEdit: User = { ...this.editForm.value };
    userEdit.id = this.userId;
    userEdit.photo = this.currentUser.photo;

    if (this.editForm.valid) {
      this.usersService.update(userEdit).then(res => {
        this.getUserData();
        this.action = 'USER';
      }).catch(res => {
        alert('Su perfil no ha podido ser editado');
      });
    } else {
      // Si el formulario no es válido marcamos los campos como incorrectos "tocándolos"
      Object.keys(this.editForm.controls).forEach(field => {
        const control = this.editForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

    }
  }

  getUserData() {
    this.usersService.getUserData(this.userId).then(user => {
      user.token = this.currentUser.token;
      this.usersService.isLogged = user;
    })
  }

}
