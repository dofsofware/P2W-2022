import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAbonne } from '../abonne.model';

@Component({
  selector: 'jhi-abonne-detail',
  templateUrl: './abonne-detail.component.html',
})
export class AbonneDetailComponent implements OnInit {
  abonne: IAbonne | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ abonne }) => {
      this.abonne = abonne;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
