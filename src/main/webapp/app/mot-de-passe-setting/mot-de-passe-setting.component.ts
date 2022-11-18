import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { GlobalPartageService } from 'app/global-partage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-mot-de-passe-setting',
  templateUrl: './mot-de-passe-setting.component.html',
  styleUrls: ['./mot-de-passe-setting.component.scss'],
})
export class MotDePasseSettingComponent implements OnInit {
  doNotMatch = false;
  error = false;
  success = false;
  abonneEncore: IAbonne | undefined;
  isChanging = false;

  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(
    private fb: FormBuilder,
    private abonneService: AbonneService,
    private globalPartageService: GlobalPartageService,
    private cookieService: CookieService,
    private router: Router
  ) {}

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
              this.abonneEncore = abonne.body;
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

  changePassword(): void {
    this.error = false;
    this.success = false;
    this.doNotMatch = false;

    const newPassword = this.passwordForm.get(['newPassword'])!.value;
    if (newPassword !== this.passwordForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      this.isChanging = true;
      const Password = this.passwordForm.get(['currentPassword'])!.value;
      const MOTDEPASSEENCORE = this.abonneEncore?.motDePasse;
      if (MOTDEPASSEENCORE) {
        if (this.globalPartageService.CompareHash(Password, MOTDEPASSEENCORE)) {
          this.abonneEncore!.motDePasse = this.globalPartageService.bcryter(newPassword);
          this.abonneService.update(this.abonneEncore!).subscribe(() => {
            this.success = true;
            this.isChanging = false;
          });
        } else {
          this.error = true;
          this.isChanging = false;
        }
      }
    }
  }
}
