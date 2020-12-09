import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {

  action: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

    this.action = this.activatedRoute.snapshot.url[0].path;
    console.log(this.activatedRoute.snapshot, this.action);

  }

  ngOnInit(): void {
  }

}
