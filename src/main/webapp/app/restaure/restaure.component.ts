import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { AbonneService } from 'app/entities/abonne/service/abonne.service';
import { IGains } from 'app/entities/gains/gains.model';
import { GainsService } from 'app/entities/gains/service/gains.service';
import { GlobalPartageService } from 'app/global-partage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-restaure',
  templateUrl: './restaure.component.html',
  styleUrls: ['./restaure.component.scss'],
})
export class RestaureComponent implements OnInit {
  randomPass!: number;
  isSaving = false;
  gains: IGains[] = [];
  abonnes: IAbonne[];
  links: any;
  page: number;
  itemsPerPage: number;
  predicate: string;
  motDePasseHashed: string;
  match: boolean;
  ascending: boolean;
  sufix: number | undefined;
  abonneEncore: IAbonne | null = null;
  numberIncorrect: boolean;
  inputNum: string;

  editForm = this.fb.group({
    id: [],
    identifiant: [],
    telephone: [null, [Validators.required, this.telephoneValidator.bind(this)]],
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
    private router: Router
  ) {
    this.match = false;
    this.abonnes = [];
    this.page = 0;
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.inputNum = '';
    this.ascending = true;
    this.motDePasseHashed = 'pas changer';
    this.numberIncorrect = false;
  }

  ngOnInit(): void {
    this.randomPass = Math.floor(Math.random() * Math.floor(999999));
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
      codeRactivation: abonne.codeRactivation,
    });
  }

  saveAbonne(): void {
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
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IAbonne>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  onSaveSuccess(): void {
    this.isSaving = false;
    if (this.abonneEncore) {
      this.globalPartageService.updateAbonne(this.abonneEncore);
    }
    this.router.navigate(['/saisie-code']);
  }

  onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IGains): any {
    return item.id;
  }

  getSelected(selectedVals: IGains[], option: IGains): IGains {
    // if (selectedVals) {
    for (let i = 0; i < selectedVals.length; i++) {
      if (option.id === selectedVals[i].id) {
        return selectedVals[i];
      }
      // }
    }
    return option;
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

  telephoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const NumTel: string = control.value;
    if (control.value !== '') {
      if (NumTel !== '' && NumTel.length >= 4) {
        for (let i = 0; i < this.abonnes.length; i++) {
          if (this.abonnes[i].telephone === NumTel) {
            return null;
          }
        }
      }
    }
    return { NumExistePas: true };
  }
}
