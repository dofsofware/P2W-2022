import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import * as bcrypt from 'bcryptjs';
type EntityResponseTypeAbonne = HttpResponse<IAbonne>;

@Injectable({
  providedIn: 'root',
})
export class GlobalPartageService {
  salt: string;
  hash: string;
  separateur: string;
  abonneEncore: IAbonne | undefined;
  payer: boolean;
  finDuJeu: boolean;
  gain: string;
  choix: string;
  idCrypte: string;
  encryptSecretKey: string;
  expiredDate: Date;
  gainSession: number;
  MonRang: number;
  isAuthEncrypte: string;
  abonnes: IAbonne[];
  les10premiers: IAbonne[];

  constructor(
    private cookieService: CookieService,
    private abonneService: AbonneService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.salt = '';
    this.isAuthEncrypte = '';
    this.separateur = '$xfrt$';
    this.hash = '';
    this.gain = '';
    this.choix = '';
    this.idCrypte = '';
    this.gainSession = 0;
    this.MonRang = 0;
    this.expiredDate = new Date();
    this.encryptSecretKey = 'Tech-Xel@Play2win@Simvas';
    this.payer = false;
    this.finDuJeu = false;
    this.abonnes = [];
    this.les10premiers = [];
  }

  AutoLogin(): any {
    return this.loginService.login({
      username: 'user',
      password: 'user',
      rememberMe: true,
    });
  }
  //
  encryptData(data: any): any {
    try {
      return data; // CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
  decryptData(data: any): any {
    try {
      const bytes = ''; // CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return ''; // JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  setIsAuth(isAuth: boolean): void {
    if (isAuth === true) {
      localStorage.setItem('isAuth', this.encryptData('vrai'));
    } else {
      localStorage.setItem('isAuth', this.encryptData('faux'));
    }
  }

  getIsAuth(): boolean {
    this.isAuthEncrypte = localStorage.getItem('isAuth')!;
    if (this.isAuthEncrypte !== '') {
      if (this.decryptData(this.isAuthEncrypte) === 'vrai') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  setChoix(choix: string): void {
    this.choix = choix;
  }

  getChoix(): string {
    return this.choix;
  }
  setGain(gain: string): void {
    this.gain = gain;
  }

  getGain(): string {
    return this.gain;
  }

  setPayer(payer: boolean): void {
    this.payer = payer;
  }

  getPayer(): boolean {
    return this.payer;
  }

  setFinDuJeu(finDuJeu: boolean): void {
    this.finDuJeu = finDuJeu;
  }

  getFinDuJeu(): boolean {
    return this.finDuJeu;
  }
  deconnexion(): void {
    localStorage.setItem('_fir', '');
    localStorage.setItem('isAuth', '');
    this.cookieService.set('auth', '');
    this.gain = '';
    this.payer = false;
    this.setIsAuth(false);
    this.router.navigate(['/']);
  }
  viderStockLocal(): void {
    localStorage.setItem('_fir', '');
    localStorage.setItem('isAuth', '');
    this.cookieService.set('auth', '');
    this.gain = '';
    this.payer = false;
    this.setIsAuth(false);
  }
  updateAbonne(abonne: IAbonne | undefined): void {
    this.abonneEncore = abonne;
    this.expiredDate = new Date();
    this.expiredDate.setDate(this.expiredDate.getDate() + 7);

    this.cookieService.set(
      'auth',
      `${String(this.encryptData(abonne?.id))} ${this.separateur} ${String(this.encryptData(abonne?.telephone))}`,
      this.expiredDate
    );
    localStorage.setItem('_fir', this.encryptData(abonne?.motDePasse));
  }

  getAbonneEncore(): Observable<EntityResponseTypeAbonne> {
    this.idCrypte = this.cookieService.get('auth').split(this.separateur)[0];
    return this.abonneService.find(this.decryptData(this.idCrypte));
  }

  setAbonneEncore(iAbonne: IAbonne | undefined): void {
    this.updateAbonne(iAbonne);
    this.abonneEncore = iAbonne;
  }

  bcryter(motdepasse: string): string {
    // this.salt = bcrypt.genSaltSync(10);
    // this.hash = bcrypt.hashSync(motdepasse, this.salt);
    // return this.hash;
    return motdepasse;
  }
  // @typescript-eslint/no-unused-vars motdepasse: string, hash: string
  // CompareHash(): boolean {
  //   // return bcrypt.compareSync(motdepasse, hash);
  //   return true;
  // }
  CompareHash(motdepasse: string, hash: string): boolean {
    return bcrypt.compareSync(motdepasse, hash);
  }
  getRang(): void {
    this.abonnes = [];
    this.abonneService.query().subscribe((res: HttpResponse<IAbonne[]>) => {
      if (res.body) {
        this.abonnes = [];
        for (let i = 0; i < res.body.length; i++) {
          this.abonnes.push(res.body[i]);
        }
      }

      this.abonnes.sort(function (a: IAbonne, b: IAbonne) {
        return b.score! - a.score!;
      });
      this.idCrypte = this.cookieService.get('auth').split(this.separateur)[0];
      const idencore = this.decryptData(this.idCrypte);
      this.MonRang = this.abonnes.findIndex(a => a.id === idencore) + 1;
    });
  }
  push10premier(): void {
    this.les10premiers = [];
    this.abonnes = [];
    this.abonneService.query().subscribe((res: HttpResponse<IAbonne[]>) => {
      if (res.body) {
        for (let i = 0; i < res.body.length; i++) {
          this.abonnes.push(res.body[i]);
        }
      }

      this.abonnes.sort(function (a: IAbonne, b: IAbonne) {
        return b.score! - a.score!;
      });
      for (let i = 0; i < 10; i++) {
        if (i === this.abonnes.length) {
          break;
        }
        this.les10premiers.push(this.abonnes[i]);
      }
    });
  }
}
