import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    private modal: NgbModal,
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.action = this.activatedRoute.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
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

  logOut(): void {
    this.userService.isLogged = null;
    this.router.navigate(['/']);
  }

  stopStories(): void {
    clearInterval(this.storiesInterval);
    clearInterval(this.progressBarInterval);
  }




}
