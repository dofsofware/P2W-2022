import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { GlobalPartageService } from 'app/global-partage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-principes',
  templateUrl: './principes.component.html',
  styleUrls: ['./principes.component.scss'],
})
export class PrincipesComponent implements OnInit {
  abonneEncoure: IAbonne | undefined;
  constructor(private router: Router, private cookieService: CookieService, private globalPartageService: GlobalPartageService) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
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
              localStorage.setItem('isAuth', this.globalPartageService.encryptData('vrai'));
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
  }
  goToProfil(): void {
    this.router.navigate(['/profil']);
  }
}
