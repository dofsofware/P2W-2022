import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { ChoixDuGain } from 'app/entities/enumerations/choix-du-gain.model';
import { GlobalPartageService } from 'app/global-partage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss'],
})
export class ResultatComponent implements OnInit, AfterViewInit {
  abonneEncoure: IAbonne | undefined;

  constructor(private globalPartageService: GlobalPartageService, private router: Router, private cookieService: CookieService) {}
  ngAfterViewInit(): void {
    this.footerGoDwon();
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
              localStorage.setItem('isAuth', this.globalPartageService.encryptData('vrai'));
              this.globalPartageService.setFinDuJeu(true);
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

  gainSession(): string {
    if (this.globalPartageService.choix === ChoixDuGain.MINUTES) {
      return `${this.globalPartageService.gainSession} Min`;
    } else {
      return `${this.globalPartageService.gainSession} MB`;
    }
  }
  gainSessionSansUnite(): number {
    return this.globalPartageService.gainSession;
  }

  scoreSession(): number {
    if (this.globalPartageService.choix === ChoixDuGain.MINUTES) {
      return (this.globalPartageService.gainSession / (Number(this.globalPartageService.gain) / 10)) * 4;
    } else {
      return (this.globalPartageService.gainSession / Number(this.globalPartageService.gain)) * 4;
    }
  }

  goToChoix(): void {
    this.router.navigate(['/choix']);
  }

  goToProfil(): void {
    this.router.navigate(['/profil']);
  }

  footerGoDwon(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    $(document).ready(() => {
      const cible: any = $('#cible');
      if (!isMobile) {
        //  Desktop Device
        cible.removeClass('footerDown');
      } else {
        //  Mobile Device
        cible.addClass('footerDown');
      }
    });
  }
}
