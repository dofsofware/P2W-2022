// import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { IGains } from 'app/entities/gains/gains.model';
import { GainsService } from 'app/entities/gains/service/gains.service';
import { GlobalPartageService } from 'app/global-partage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'jhi-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent implements OnInit {
  isSaving = false;
  gains: IGains[] = [];
  abonnes: IAbonne[];
  links: any;
  page: number;
  itemsPerPage: number;
  predicate: string;
  match: boolean;
  ascending: boolean;
  abonneEncore: IAbonne | null = null;
  inputNum: string;
  codeErreur: boolean;
  passwordSaisi: string;
  numPasTrouve: boolean;
  numberIncorrect: boolean;

  editForm = this.fb.group({
    id: [],
    identifiant: [],
    telephone: [null, [Validators.required]],
    motDePasse: [null, [Validators.required, Validators.minLength(4)]],
    score: [],
    niveau: [],
    createdAt: [],
    dernierePaticipation: [],
    actif: [],
    gains: [],
  });

  constructor(
    protected abonneService: AbonneService,
    protected globalPartageService: GlobalPartageService,
    protected gainsService: GainsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    // protected parseLinks: JhiParseLinks,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.match = false;
    this.abonnes = [];
    this.page = 0;
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.links = {
      last: 0,
    };
    this.numPasTrouve = true;
    this.predicate = 'id';
    this.ascending = true;
    this.inputNum = '';
    this.passwordSaisi = '';
    this.codeErreur = false;
    this.numberIncorrect = false;
  }

  resetCodeErreur(): void {
    this.codeErreur = false;
    this.numberIncorrect = false;
  }

  authentifier(): void {
    this.isSaving = true;
    this.inputNum = this.inputNum.replace(/\s/g, '');
    this.inputNum =
      this.inputNum.substr(0, 2) + ' ' + this.inputNum.substr(2, 3) + ' ' + this.inputNum.substr(5, 2) + ' ' + this.inputNum.substr(7, 2);

    if (this.inputNum) {
      if (isNaN(Number(this.inputNum.substr(0, 2)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (isNaN(Number(this.inputNum.substr(3, 3)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (isNaN(Number(this.inputNum.substr(7, 2)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (isNaN(Number(this.inputNum.substr(10, 2)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (this.inputNum.split(' ').length - 1 !== 3) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (this.inputNum.length !== 12) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else {
        this.numberIncorrect = false;
        this.inputNum =
          this.inputNum.substr(0, 2) +
          ' ' +
          this.inputNum.substr(3, 3) +
          ' ' +
          this.inputNum.substr(7, 2) +
          ' ' +
          this.inputNum.substr(10, 2);
      }
    }

    for (let i = 0; i < this.abonnes.length; i++) {
      if (this.abonnes[i].telephone === this.inputNum) {
        this.numPasTrouve = false;
        const MOTDEPASSEENCORE = this.abonnes[i]?.motDePasse;
        if (MOTDEPASSEENCORE !== undefined) {
          if (this.globalPartageService.CompareHash(this.passwordSaisi, MOTDEPASSEENCORE)) {
            this.codeErreur = false;
            this.globalPartageService.updateAbonne(this.abonnes[i]);
            this.abonneEncore = this.abonnes[i];
            this.globalPartageService.setIsAuth(true);
            this.router.navigate(['/profil']);
            this.isSaving = false;
          } else {
            this.codeErreur = true;
            this.isSaving = false;
          }
        }
      }
    }
    if (this.numPasTrouve === true) {
      this.codeErreur = true;
      this.isSaving = false;
    }
    this.isSaving = false;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.globalPartageService.getAbonneEncore().subscribe(abonne => {
      if (abonne.body!.telephone === undefined) {
        this.globalPartageService.viderStockLocal();
      } else {
        if (
          abonne.body!.telephone ===
          this.globalPartageService.decryptData(this.cookieService.get('auth').split(this.globalPartageService.separateur)[1])
        ) {
          if (abonne.body!.motDePasse === this.globalPartageService.decryptData(localStorage.getItem('_fir'))) {
            if (abonne.body) {
              this.router.navigate(['/profil']);
            }
          }
        }
      }
    });
    this.loadAllAbonne();
  }
  resetAbonne(): void {
    this.page = 0;
    this.abonnes = [];
    this.loadAllAbonne();
  }
  loadPage(page: number): void {
    this.page = page;
    this.loadAllAbonne();
  }

  loadAllAbonne(): void {
    this.abonneService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sortAbonne(),
      })
      .subscribe(res => (this.abonnes = res.body!));
  }
  // protected paginateAbonnes(data: IAbonne[] | null, headers: HttpHeaders): void {
  //   const headersLink = headers.get('link');
  //   this.links = this.parseLinks.parse(headersLink ? headersLink : '');
  //   if (data) {
  //     for (let i = 0; i < data.length; i++) {
  //       this.abonnes.push(data[i]);
  //     }
  //   }
  // }

  sortAbonne(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  telephoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const NumTel: string | null = control.value;
    if (NumTel !== null) {
      if (NumTel !== '' && NumTel.length >= 4) {
        for (let i = 0; i < this.abonnes.length; i++) {
          if (this.abonnes[i].telephone === NumTel) {
            this.globalPartageService.updateAbonne(this.abonnes[i]);
            this.abonneEncore = this.abonnes[i];
            return null;
          }
        }
      }
    }
    return { NumExistePas: true };
  }
}
