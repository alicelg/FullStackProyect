import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('content') content;
  modalRef: NgbModalRef;

  constructor(
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  showStory(): void {
    if (!this.modal.hasOpenModals()) {
      this.modalRef = this.modal.open(this.content, { ariaLabelledBy: 'story', size: 's', centered: true });
    }
  }

}
