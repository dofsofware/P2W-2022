import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { ChoixDuGain } from 'app/entities/enumerations/choix-du-gain.model';
import { Gains, IGains } from 'app/entities/gains/gains.model';
import { GainsService } from 'app/entities/gains/service/gains.service';
import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { GlobalPartageService } from 'app/global-partage.service';
import { EtatQuestionPlay } from 'app/shared/models/etatQuestionPlay.model';
import { IQuestionPlay } from 'app/shared/models/questionPlay.model';
import dayjs from 'dayjs/esm';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {
  intervale: any;
  intervale2: any;
  i: number;
  y: number;
  indexQuestion: number;
  totalLenght: number;
  randomIdQuestion: number;
  questionsPlay: IQuestionPlay[] = [];
  questionsPlayCourant!: IQuestionPlay;
  reponseFournie: number;
  bonneReponse: number;
  verification: boolean;
  test: any;
  abonneEncoure!: IAbonne;
  gains: IGains[] = [];
  valeurDuGain: number;
  Totalminutes: number;
  TotalMega: number;
  valeurTempo: string;
  questionReformatee: IQuestion | undefined;
  proposition2: string;
  proposition3: string;
  proposition4: string;
  bonneProposition: string;
  quiz: string;
  indexAleatoire: number;

  constructor(
    private router: Router,
    protected abonneService: AbonneService,
    protected gainsService: GainsService,
    protected questionService: QuestionService,
    private globalPartageService: GlobalPartageService,
    private cookieService: CookieService
  ) {
    this.Totalminutes = 0;
    this.TotalMega = 0;
    this.reponseFournie = 0;
    this.bonneReponse = 0;
    this.valeurDuGain = 0;
    this.indexAleatoire = 0;
    this.i = 30;
    this.y = 0;
    this.indexQuestion = 0;
    this.totalLenght = 219.55625915527344;
    this.randomIdQuestion = 0;
    this.verification = false;
    this.valeurTempo = '';
    this.questionReformatee = undefined;
    this.proposition2 = '';
    this.proposition3 = '';
    this.proposition4 = '';
    this.bonneProposition = '';
    this.quiz = '';
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
              if (abonne.body.gains) {
                this.gains = abonne.body.gains;
              }
              localStorage.setItem('isAuth', this.globalPartageService.encryptData('vrai'));

              if (
                this.globalPartageService.getGain() === '' ||
                this.globalPartageService.payer === false ||
                this.globalPartageService.getFinDuJeu() === true
              ) {
                this.router.navigate(['/choix']);
              } else {
                this.RemplirQuestionPlay();
                $('.circle_animation').css('stroke-dashoffset', 0);
                $('.circle_animation').css('stroke-dasharray', this.totalLenght);
                this.startTimer();
                this.globalPartageService.payer = false;
              }
              this.globalPartageService.gainSession = 0;
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
  // console.log(Math.floor(Math.random() * (5 - 2) + 2));
  RemplirQuestionPlay(): void {
    this.indexAleatoire = 0;
    this.valeurTempo = '';
    this.questionReformatee = undefined;
    this.proposition2 = '';
    this.proposition3 = '';
    this.proposition4 = '';
    for (let index = 0; index < 5; index++) {
      this.randomIdQuestion = Math.floor(Math.random() * Math.floor(4463));
      this.globalPartageService.gainSession = 0;
      this.questionService.find(this.randomIdQuestion).subscribe(data => {
        if (data.body) {
          this.questionsPlayCourant = {
            question: data.body,
            etat: EtatQuestionPlay.SANSREPONSE,
          };
          this.indexAleatoire = Math.floor(Math.random() * (5 - 2) + 2);
          if (this.indexAleatoire === 2) {
            this.valeurTempo = this.questionsPlayCourant.question!.reponse1!;
            this.proposition2 = this.questionsPlayCourant.question!.reponse2!;
            this.proposition3 = this.questionsPlayCourant.question!.reponse3!;
            this.proposition4 = this.questionsPlayCourant.question!.reponse4!;
            this.bonneProposition = this.questionsPlayCourant.question!.bonneReponse!;
            if (this.questionsPlayCourant.question) {
              this.quiz = this.questionsPlayCourant.question.quiz!;
            }
            this.questionReformatee = {
              reponse1: this.proposition2,
              reponse2: this.valeurTempo,
              reponse3: this.proposition3,
              reponse4: this.proposition4,
              bonneReponse: this.bonneProposition,
              quiz: this.quiz,
            };
          } else if (this.indexAleatoire === 3) {
            this.valeurTempo = this.questionsPlayCourant.question!.reponse1!;
            this.proposition2 = this.questionsPlayCourant.question!.reponse2!;
            this.proposition3 = this.questionsPlayCourant.question!.reponse3!;
            this.proposition4 = this.questionsPlayCourant.question!.reponse4!;
            this.bonneProposition = this.questionsPlayCourant.question!.bonneReponse!;
            if (this.questionsPlayCourant.question) {
              this.quiz = this.questionsPlayCourant.question.quiz!;
            }

            this.questionReformatee = {
              reponse1: this.proposition3,
              reponse2: this.proposition2,
              reponse3: this.valeurTempo,
              reponse4: this.proposition4,
              bonneReponse: this.bonneProposition,
              quiz: this.quiz,
            };
          } else if (this.indexAleatoire === 4) {
            this.valeurTempo = this.questionsPlayCourant.question!.reponse1!;
            this.proposition2 = this.questionsPlayCourant.question!.reponse2!;
            this.proposition3 = this.questionsPlayCourant.question!.reponse3!;
            this.proposition4 = this.questionsPlayCourant.question!.reponse4!;
            this.bonneProposition = this.questionsPlayCourant.question!.bonneReponse!;
            if (this.questionsPlayCourant.question) {
              this.quiz = this.questionsPlayCourant.question.quiz!;
            }
            this.questionReformatee = {
              reponse1: this.proposition4,
              reponse2: this.proposition2,
              reponse3: this.proposition3,
              reponse4: this.valeurTempo,
              bonneReponse: this.bonneProposition,
              quiz: this.quiz,
            };
          }
          this.questionsPlayCourant = {
            question: this.questionReformatee,
            etat: EtatQuestionPlay.SANSREPONSE,
          };

          this.questionsPlay.splice(index, 0, this.questionsPlayCourant);
        }
      });
    }
  }

  startTimer(): void {
    this.intervale = setInterval(() => {
      $('.circle_animation').css('stroke-dashoffset', this.totalLenght - (this.i - 1) * (this.totalLenght / 30));
      this.i--;
      if (this.i === 0) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEFAUSSE;
        this.verifierBonneReponse();
        this.initTimer();
        clearInterval(this.intervale);
      }
    }, 1000);
  }

  reponse1(): void {
    if (this.verification === false) {
      this.verification = true;
      this.reponseFournie = 1;
      clearInterval(this.intervale);
      if (this.questionsPlay[this.indexQuestion].question?.reponse1 === this.questionsPlay[this.indexQuestion].question?.bonneReponse) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEVRAIS;
        this.positionnerGain();
      } else if (
        this.questionsPlay[this.indexQuestion].question?.reponse1 !== this.questionsPlay[this.indexQuestion].question?.bonneReponse
      ) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEFAUSSE;
        this.verifierBonneReponse();
      }
      this.initTimer();
    }
  }

  positionnerGain(): void {
    if (this.globalPartageService.choix === ChoixDuGain.MINUTES && this.globalPartageService.gain === '100') {
      this.valeurDuGain = 10;
      this.globalPartageService.gainSession += 10;
      this.abonneEncoure.score! += 1000;
    } else if (this.globalPartageService.choix === ChoixDuGain.MINUTES && this.globalPartageService.gain === '250') {
      this.valeurDuGain = 25;
      this.globalPartageService.gainSession += 25;
      this.abonneEncoure.score! += 2500;
    } else if (this.globalPartageService.choix === ChoixDuGain.MINUTES && this.globalPartageService.gain === '500') {
      this.valeurDuGain = 50;
      this.globalPartageService.gainSession += 50;
      this.abonneEncoure.score! += 5000;
    } else if (this.globalPartageService.choix === ChoixDuGain.MINUTES && this.globalPartageService.gain === '1000') {
      this.valeurDuGain = 100;
      this.globalPartageService.gainSession += 100;
      this.abonneEncoure.score! += 10000;
    } else if (this.globalPartageService.choix === ChoixDuGain.INTERNET && this.globalPartageService.gain === '100') {
      this.valeurDuGain = 100;
      this.globalPartageService.gainSession += 100;
      this.abonneEncoure.score! += 1000;
    } else if (this.globalPartageService.choix === ChoixDuGain.INTERNET && this.globalPartageService.gain === '250') {
      this.valeurDuGain = 250;
      this.globalPartageService.gainSession += 250;
      this.abonneEncoure.score! += 2500;
    } else if (this.globalPartageService.choix === ChoixDuGain.INTERNET && this.globalPartageService.gain === '500') {
      this.valeurDuGain = 500;
      this.globalPartageService.gainSession += 500;
      this.abonneEncoure.score! += 5000;
    } else if (this.globalPartageService.choix === ChoixDuGain.INTERNET && this.globalPartageService.gain === '1000') {
      this.valeurDuGain = 1000;
      this.globalPartageService.gainSession += 1000;
      this.abonneEncoure.score! += 10000;
    }

    if (this.globalPartageService.choix === ChoixDuGain.MINUTES) {
      this.gainsService
        .create({
          ...new Gains(),
          id: undefined,
          telephone: this.abonneEncoure.telephone,
          minute: this.valeurDuGain,
          megabit: 0,
          createdAt: dayjs(new Date()),
        })
        .subscribe((res: HttpResponse<IGains>) => {
          this.abonneEncoure.gains!.push(res.body!);
          this.abonneService.update(this.abonneEncoure).subscribe();
        });
    } else if (this.globalPartageService.choix === ChoixDuGain.INTERNET) {
      this.gainsService
        .create({
          ...new Gains(),
          id: undefined,
          telephone: this.abonneEncoure.telephone,
          minute: 0,
          megabit: this.valeurDuGain,
          createdAt: dayjs(new Date()),
        })
        .subscribe((res: HttpResponse<IGains>) => {
          this.abonneEncoure.gains!.push(res.body!);
          this.abonneService.update(this.abonneEncoure).subscribe();
        });
    }
  }

  gainSession(): number {
    return this.globalPartageService.gainSession;
  }

  TotalMin(): number {
    this.Totalminutes = 0;
    for (let index = 0; index < this.abonneEncoure.gains!.length; index++) {
      this.Totalminutes += this.abonneEncoure.gains![index].minute!;
    }
    return this.Totalminutes;
  }

  TotalMb(): number {
    this.TotalMega = 0;
    for (let index = 0; index < this.abonneEncoure.gains!.length; index++) {
      this.TotalMega += this.abonneEncoure.gains![index].megabit!;
    }
    return this.TotalMega;
  }

  reponse2(): void {
    if (this.verification === false) {
      this.verification = true;
      this.reponseFournie = 2;
      clearInterval(this.intervale);
      if (this.questionsPlay[this.indexQuestion].question?.reponse2 === this.questionsPlay[this.indexQuestion].question?.bonneReponse) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEVRAIS;
        this.positionnerGain();
      } else if (
        this.questionsPlay[this.indexQuestion].question?.reponse2 !== this.questionsPlay[this.indexQuestion].question?.bonneReponse
      ) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEFAUSSE;
        this.verifierBonneReponse();
      }
      this.initTimer();
    }
  }

  reponse3(): void {
    if (this.verification === false) {
      this.verification = true;
      this.reponseFournie = 3;
      clearInterval(this.intervale);
      if (this.questionsPlay[this.indexQuestion].question?.reponse3 === this.questionsPlay[this.indexQuestion].question?.bonneReponse) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEVRAIS;
        this.positionnerGain();
      } else if (
        this.questionsPlay[this.indexQuestion].question?.reponse3 !== this.questionsPlay[this.indexQuestion].question?.bonneReponse
      ) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEFAUSSE;
        this.verifierBonneReponse();
      }
      this.initTimer();
    }
  }

  reponse4(): void {
    if (this.verification === false) {
      this.verification = true;
      this.reponseFournie = 4;
      clearInterval(this.intervale);
      if (this.questionsPlay[this.indexQuestion].question?.reponse4 === this.questionsPlay[this.indexQuestion].question?.bonneReponse) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEVRAIS;
        this.positionnerGain();
      } else if (
        this.questionsPlay[this.indexQuestion].question?.reponse4 !== this.questionsPlay[this.indexQuestion].question?.bonneReponse
      ) {
        this.questionsPlay[this.indexQuestion].etat = EtatQuestionPlay.REPONSEFAUSSE;
        this.verifierBonneReponse();
      }
      this.initTimer();
    }
  }

  verifierBonneReponse(): void {
    if (this.questionsPlay[this.indexQuestion].question?.reponse1 === this.questionsPlay[this.indexQuestion].question?.bonneReponse) {
      this.bonneReponse = 1;
    } else if (
      this.questionsPlay[this.indexQuestion].question?.reponse2 === this.questionsPlay[this.indexQuestion].question?.bonneReponse
    ) {
      this.bonneReponse = 2;
    } else if (
      this.questionsPlay[this.indexQuestion].question?.reponse3 === this.questionsPlay[this.indexQuestion].question?.bonneReponse
    ) {
      this.bonneReponse = 3;
    } else if (
      this.questionsPlay[this.indexQuestion].question?.reponse4 === this.questionsPlay[this.indexQuestion].question?.bonneReponse
    ) {
      this.bonneReponse = 4;
    }
  }

  initTimer(): void {
    this.intervale2 = setInterval(() => {
      $('.circle_animation').css('stroke-dashoffset', 0);
      $('.circle_animation').css('stroke-dasharray', this.totalLenght);
      this.i = 30;
      this.startTimer();
      if (this.y === 0) {
        if (this.indexQuestion !== 4) {
          this.indexQuestion++;
          this.bonneReponse = 0;
          this.verification = false;
          this.reponseFournie = 0;
        } else {
          this.i = 30;
          clearInterval(this.intervale);
          clearInterval(this.intervale2);
          this.router.navigateByUrl('/resultat');
        }
        clearInterval(this.intervale2);
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervale);
    clearInterval(this.intervale2);
  }
}
