import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { Abonne, IAbonne } from 'app/entities/abonne/abonne.model';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { Niveau } from 'app/entities/enumerations/niveau.model';
import { IGains } from 'app/entities/gains/gains.model';
import { GainsService } from 'app/entities/gains/service/gains.service';
import { GlobalPartageService } from 'app/global-partage.service';
import dayjs from 'dayjs/esm';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  randomPass!: number;
  isSaving = false;
  gains: IGains[] = [];
  abonnes: IAbonne[];
  links: any;
  page: number;
  itemsPerPage: number;
  predicate: string;
  num: string | undefined;
  motDePasseHashed: string;
  match: boolean;
  ascending: boolean;
  sufix: number | undefined;
  abonneEncore: IAbonne | null = null;
  numberIncorrect: boolean;

  editForm = this.fb.group({
    id: [],
    identifiant: [],
    telephone: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12), this.telephoneValidator.bind(this)]],
    motDePasse: [],
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
    this.numberIncorrect = false;
    this.abonnes = [];
    this.page = 0;
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.num = '';
    this.ascending = true;
    this.motDePasseHashed = 'pas changer';
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
    this.randomPass = Math.floor(Math.random() * (999999 - 111111) + 111111);
    // this.motDePasseHashed = this.globalPartageService.bcryter('test');
    // this.match = this.globalPartageService.CompareHash('test', this.motDePasseHashed);
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

  updateForm(abonne: IAbonne): void {
    this.editForm.patchValue({
      id: abonne.id,
      identifiant: abonne.identifiant,
      telephone: abonne.telephone,
      motDePasse: abonne.motDePasse,
      score: abonne.score,
      niveau: abonne.niveau,
      createdAt: abonne.createdAt ? abonne.createdAt.format(DATE_TIME_FORMAT) : null,
      dernierePaticipation: abonne.dernierePaticipation ? abonne.dernierePaticipation.format(DATE_TIME_FORMAT) : null,
      gains: abonne.gains,
      actif: abonne.actif,
    });
  }
  sortAbonne(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  previousState(): void {
    // aller vers la page code
    window.history.back();
  }

  saveAbonne(): void {
    this.isSaving = true;
    this.sufix = this.abonnes.length + 501;
    const abonne = this.createFromAbonne();
    this.num = abonne.telephone;
    this.num = this.num!.replace(/\s/g, '');
    this.num = this.num.substr(0, 2) + ' ' + this.num.substr(2, 3) + ' ' + this.num.substr(5, 2) + ' ' + this.num.substr(7, 2);

    if (this.num) {
      if (isNaN(Number(this.num.substr(0, 2)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (isNaN(Number(this.num.substr(3, 3)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (isNaN(Number(this.num.substr(7, 2)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (isNaN(Number(this.num.substr(10, 2)))) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (this.num.split(' ').length - 1 !== 3) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else if (this.num.length !== 12) {
        this.numberIncorrect = true;
        this.isSaving = false;
        return;
      } else {
        this.numberIncorrect = false;
        abonne.telephone = this.num;
      }
    }
    this.motDePasseHashed = this.globalPartageService.bcryter(String(this.randomPass));
    abonne.motDePasse = this.motDePasseHashed;
    if (abonne.id !== undefined) {
      this.subscribeToSaveResponse(this.abonneService.update(abonne));
    } else {
      this.globalPartageService.updateAbonne(abonne);
      this.subscribeToSaveResponse(this.abonneService.create(abonne));
    }
  }
  resetNumber(): void {
    this.numberIncorrect = false;
  }

  createFromAbonne(): IAbonne {
    this.abonneEncore = {
      ...new Abonne(),
      identifiant: `player${String(this.sufix)}`,
      telephone: this.editForm.get(['telephone'])!.value,
      motDePasse: this.motDePasseHashed,
      score: 0.0,
      niveau: Niveau.DEBUTANT,
      createdAt: dayjs(new Date()), // DATE_TIME_FORMAT
      dernierePaticipation: undefined,
      actif: false,
      gains: undefined,
    };
    return this.abonneEncore;
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IAbonne>>): void {
    result.subscribe(
      abonne => this.onSaveSuccess(abonne.body!),
      () => this.onSaveError()
    );
  }

  onSaveSuccess(abonne: IAbonne): void {
    this.isSaving = false;
    this.globalPartageService.updateAbonne(abonne);
    alert(
      `SMS!!!\n bienvenue dans play 2 win \n le nombre ci-dessous est votre code d'activation et votre mot de passe initial merci de le modifier \n code : ${this.randomPass}`
    );
    this.router.navigate(['/saisie-code']);
  }

  onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IGains): any {
    return item.id;
  }

  getSelected(selectedVals: IGains[], option: IGains): IGains {
    for (let i = 0; i < selectedVals.length; i++) {
      if (option.id === selectedVals[i].id) {
        return selectedVals[i];
      }
    }
    return option;
  }

  // paginateAbonnes(data: IAbonne[] | null, headers: HttpHeaders): void {
  //   // const headersLink = headers.get('link');
  //   // this.links = this.parseLinks.parse(headersLink ? headersLink : '');
  //   if (data) {
  //     for (let i = 0; i < data.length; i++) {
  //       this.abonnes.push(data[i]);
  //     }
  //   }
  // }

  telephoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const NumTel: string = control.value;
    if (control.value) {
      if (NumTel !== '' && NumTel.length >= 4) {
        for (let i = 0; i < this.abonnes.length; i++) {
          if (this.abonnes[i].telephone === NumTel) {
            return { NumExiste: true };
          }
        }
      }
    }
    return null;
  }

  playAnimation(): void {
    // const divIllustration:any = $('#illustration');
    // const phoneNumber:any = $('#phoneNumber');
    // const formNumberPhone:any = $('#formNumberPhone');
    // const classs=divIllustration.attr("class");
    // if(classs==="col-sm bounceInLeft animated"){
    //   // divIllustration.style.display = 'none';
    //   divIllustration.removeClass("col-sm bounceInLeft animated").addClass("col-sm bounceOutLeft animated");
    //   formNumberPhone.removeClass("col-sm bounceInLeft animated").addClass("col-sm bounceOutRight animated");
    // }else{
    //   divIllustration.removeClass("col-sm bounceOutLeft animated").addClass("col-sm bounceInLeft animated");
    //   formNumberPhone.removeClass("col-sm bounceOutRight animated").addClass("col-sm bounceInLeft animated");
    // }
    // $(document).ready(() => {
    //      const divIllustration:any = document.querySelector('#illustration');
    //      alert(divIllustration);
    //      divIllustration.removeClass( " bounceInLeft animated" ).addClass( " fadeInLeft animated" );
    //   addBtn.addEventListener('click', (e: any) => {
    //     alert(addBtn.firstChild.data);
    //     if(addBtn.style.color==='red'){
    //       addBtn.style.color='black';
    //     } else {
    //       addBtn.style.color='red';
    //     }
    //     this.appelleMoiLocal('salur');
    //   });
    // });
  }
}
