import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { IAbonne } from 'app/entities/abonne/abonne.model';
import { GlobalPartageService } from 'app/global-partage.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  les10premiers: IAbonne[];

  constructor(private accountService: AccountService, private globalPartageService: GlobalPartageService) {
    this.les10premiers = [];
  }

  ngOnInit(): void {
    const subs = timer(1, 1000).subscribe(() => {
      if (this.isAuthenticated()) {
        this.globalPartageService.push10premier();
        this.authSubscription = this.accountService.getAuthenticationState().subscribe(() => {
          subs.unsubscribe();
        });
        this.get10premier();
      }
    });
  }
  appelleMoiLocal(msg: string): void {
    alert(msg);
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    // this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  isAuth(): boolean {
    return this.globalPartageService.getIsAuth();
  }

  get10premier(): void {
    this.les10premiers = this.globalPartageService.les10premiers;
  }
}
