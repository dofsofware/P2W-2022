import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { ChoixDuGain } from 'app/entities/enumerations/choix-du-gain.model';
import { IRecette, Recette } from 'app/entities/recette/recette.model';
import { RecetteService } from 'app/entities/recette/service/recette.service';
import { GlobalPartageService } from 'app/global-partage.service';
import dayjs from 'dayjs/esm';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-choix',
  templateUrl: './choix.component.html',
  styleUrls: ['./choix.component.scss'],
})
export class ChoixComponent implements OnInit {
  creditOuInternet: string;
  abonneEncoure: IAbonne | undefined;

  constructor(
    private router: Router,
    private globalPartageService: GlobalPartageService,
    private cookieService: CookieService,
    private recetteService: RecetteService,
    private abonneService: AbonneService
  ) {
    this.creditOuInternet = '';
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

    $(document).ready(function () {
      const button: any = document.getElementById('button-container');
      const credit: any = document.getElementById('credit');
      const internet: any = document.getElementById('internet');
      const buttonTrack: any = document.getElementById('my-button');

      let buttonState: any = true;
      button.addEventListener('click', () => {
        if (buttonState) {
          buttonTrack.style.transform = 'translateX(150px)';
          buttonState = false;
          credit.innerText = 'internet';
          internet.innerText = 'minutes';
          internet.style.transform = 'translateX(-150px)';
          buttonTrack.style.borderRadius = '0px 20px 20px 0px';
        } else {
          buttonTrack.style.transform = 'translateX(0px)';
          buttonState = true;
          credit.innerText = 'minutes';
          internet.innerText = 'internet';
          internet.style.transform = 'translateX(0px)';

          buttonTrack.style.borderRadius = '20px 0px 0px 20px';
        }
      });
    });
  }

  setcreditOuInternet(valeur: string): void {
    this.creditOuInternet = valeur;
  }

  jouerInternet(prix: string): void {
    this.globalPartageService.setGain(prix);
    this.globalPartageService.setChoix(ChoixDuGain.INTERNET);
    this.globalPartageService.setPayer(true);
    this.globalPartageService.setFinDuJeu(false);
    // verifier credit
    // const condictionVerifierCredit = true;
    // if (condictionVerifierCredit) {
    this.abonneEncoure!.dernierePaticipation = dayjs(new Date());
    this.abonneService.update(this.abonneEncoure!).subscribe();
    if (this.abonneEncoure?.telephone) {
      this.recetteService.create(this.createRecette(this.abonneEncoure.telephone, prix, ChoixDuGain.INTERNET)).subscribe();
      this.router.navigate(['/play']);
    }
    // }
  }

  createRecette(tel: string, montant: string, choix: ChoixDuGain): IRecette {
    return {
      ...new Recette(),
      id: undefined,
      telephone: tel,
      createdAt: dayjs(new Date()),
      montant: Number(montant),
      choixDuGain: choix,
    };
  }

  jouerMinute(prix: string): void {
    this.globalPartageService.setGain(prix);
    this.globalPartageService.setChoix(ChoixDuGain.MINUTES);
    this.globalPartageService.setPayer(true);
    this.globalPartageService.setFinDuJeu(false);
    // verifier credit
    // const condictionVerifierCredit = true;
    // if (condictionVerifierCredit) {
    this.abonneEncoure!.dernierePaticipation = dayjs(new Date());
    this.abonneService.update(this.abonneEncoure!).subscribe();
    if (this.abonneEncoure?.telephone) {
      this.recetteService.create(this.createRecette(this.abonneEncoure.telephone, prix, ChoixDuGain.MINUTES)).subscribe();
      this.router.navigate(['/play']);
    }

    // }
  }

  switch(): void {
    this.creditOuInternet = $('#internet').text();
    // const offreInternet:any = $('#offreInternet');
    // const offreCredit:any = $('#offreCredit');
    // if(this.creditOuInternet ==='internet'){
    //   offreInternet.removeClass("col-md-10 offset-md-1  bounceOutLeft animated").addClass("col-md-10 offset-md-1  bounceInLeft animated");
    //   offreCredit.removeClass("col-md-10 offset-md-1  bounceInLeft animated").addClass("col-md-10 offset-md-1  bounceOutLeft animated");
    // }else if(this.creditOuInternet ==='minutes'){
    //   offreInternet.removeClass("col-md-10 offset-md-1  bounceInLeft animated").addClass("col-md-10 offset-md-1  bounceOutLeft animated");
    //   offreCredit.removeClass("col-md-10 offset-md-1  bounceOutLeft animated").addClass("col-md-10 offset-md-1  bounceInLeft animated");
    //  }
  }
}
