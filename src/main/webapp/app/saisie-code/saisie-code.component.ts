import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { GlobalPartageService } from 'app/global-partage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-saisie-code',
  templateUrl: './saisie-code.component.html',
  styleUrls: ['./saisie-code.component.scss'],
})
export class SaisieCodeComponent implements OnInit {
  abonneEncoure: IAbonne | undefined;
  CodeSaisi: string;
  isSaving = false;
  codeErreur = false;
  i: number;
  desactiver: boolean;
  intervale: any;

  constructor(
    protected globalPartageService: GlobalPartageService,
    private cookieService: CookieService,
    private router: Router,
    private abonneService: AbonneService
  ) {
    this.CodeSaisi = '';
    this.i = 59;
    this.desactiver = true;
  }

  ngOnInit(): void {
    this.globalPartageService.getAbonneEncore().subscribe(abonne => {
      if (abonne.body!.telephone === undefined) {
        this.globalPartageService.deconnexion();
        this.router.navigate(['/authentification']);
      } else {
        if (
          abonne.body!.telephone ===
          this.globalPartageService.decryptData(this.cookieService.get('auth').split(this.globalPartageService.separateur)[1])
        ) {
          if (abonne.body!.motDePasse === this.globalPartageService.decryptData(localStorage.getItem('_fir'))) {
            if (abonne.body) {
              this.globalPartageService.abonneEncore = abonne.body;
              this.abonneEncoure = abonne.body;
              // localStorage.setItem('isAuth', this.globalPartageService.encryptData('vrai'));
            } else {
              this.globalPartageService.deconnexion();
              this.router.navigate(['/authentification']);
            }
          } else {
            this.globalPartageService.deconnexion();
            this.router.navigate(['/authentification']);
          }
        } else {
          this.globalPartageService.deconnexion();
          this.router.navigate(['/authentification']);
        }
      }
    });
    this.startTimer();
  }

  resetCodeErreur(): void {
    this.codeErreur = false;
    this.isSaving = false;
  }

  verifier(): void {
    this.isSaving = true;
    if (this.abonneEncoure?.motDePasse !== undefined) {
      const compar = this.globalPartageService.CompareHash(this.CodeSaisi, this.abonneEncoure.motDePasse);
      if (compar === true) {
        this.abonneEncoure.actif = true;
        this.abonneService.update(this.abonneEncoure).subscribe(() => {
          this.globalPartageService.setIsAuth(true);
          localStorage.setItem('isAuth', this.globalPartageService.encryptData('vrai'));
          this.router.navigate(['/principes']);
          this.isSaving = false;
        });
      } else {
        this.codeErreur = true;
        this.isSaving = false;
      }
    }
    this.isSaving = false;
  }

  startTimer(): void {
    this.intervale = setInterval(() => {
      this.i--;
      if (this.i === 0) {
        clearInterval(this.intervale);
        this.desactiver = false;
      }
    }, 1000);
  }
  renvoyerCode(): void {
    this.i = 59;
    this.startTimer();
    this.desactiver = true;
    // code d'envoie
  }
}
