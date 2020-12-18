import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  editForm: FormGroup;

  constructor(
    private modal: NgbModal,
    public userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService,
  ) {
    this.action = this.activatedRoute.snapshot.url[0].path;


    this.editForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      nickname: new FormControl(),
      country: new FormControl(),
      studies: new FormControl(),
      linkedin: new FormControl(),
      currentWord: new FormControl()

    })
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(res => {
      this.currentUser = res;
    });

    this.userService.getConcepts().then(res => {
      console.log(res);
      this.favouriteConcepts = res.concepts;
    })

    this.userService.getPost().then(res => {
      console.log(res);
      this.favouritePost = res.posts;
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


  edit(): void {
    this.userService.update(this.editForm.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

}
