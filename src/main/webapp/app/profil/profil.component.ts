import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { IGains } from 'app/entities/gains/gains.model';
import { GlobalPartageService } from 'app/global-partage.service';
import dayjs from 'dayjs/esm';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  abonneEncoure: IAbonne | undefined;
  gains: IGains[] | undefined;
  MonRang: number;

  constructor(private globalPartageService: GlobalPartageService, private router: Router, private cookieService: CookieService) {
    this.MonRang = 0;
  }

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
              this.gains = abonne.body.gains!;
              this.globalPartageService.getRang();
              this.gains.sort(function (right: IGains, left: IGains) {
                return dayjs(left.createdAt).diff(right.createdAt);
              });
              localStorage.setItem('isAuth', this.globalPartageService.encryptData('vrai'));
              this.globalPartageService.getRang();
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

  getRang(): number | undefined {
    if (this.globalPartageService.MonRang !== 0 && this.globalPartageService.MonRang !== -1) {
      return this.globalPartageService.MonRang;
    }
    return undefined;
  }

  getRangIndex(): string {
    if (this.getRang() === 1) {
      return 'er';
    } else if (this.getRang()! >= 2) {
      return 'ème';
    } else {
      return '';
    }
  }
  haveData(): boolean {
    if (this.gains?.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  parametre(): void {
    this.router.navigate(['/mot-de-passe-setting']);
  }
}
