import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import $ from 'jquery';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { GlobalPartageService } from 'app/global-partage.service';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private globalPartageService: GlobalPartageService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }
  ngAfterViewInit(): void {
    this.butonInstall();
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  isPlaying(): boolean {
    if (this.router.url === '/play') {
      return true;
    } else if (this.router.url === '/principes') {
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    // this.loginModalService.open();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  isConnected(): boolean {
    return this.globalPartageService.getIsAuth();
  }
  deconnexion(): void {
    this.globalPartageService.deconnexion();
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  butonInstall(): void {
    $(document).ready(function () {
      // buton install
      let deferredPrompt: any;
      let ribranDownload: any;

      const addBtn = document.querySelector('.add-button');
      ribranDownload = document.querySelector('.ribranDownload');

      if (ribranDownload !== null) {
        ribranDownload.style.display = 'none';
      } else {
        ribranDownload = $('#ribranDownload')[0];
        $('#ribranDownload')[0].style.display = 'none';
      }

      window.addEventListener('beforeinstallprompt', (e: any) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        ribranDownload.style.display = 'block';

        // eslint-disable-next-line
        addBtn!.addEventListener('click', (f: any) => {
          // hide our user interface that shows our A2HS button
          ribranDownload.style.display = 'none';
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
              // eslint-disable-next-line no-console
              console.log('User accepted the A2HS prompt');
            } else {
              // eslint-disable-next-line no-console
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
        });
      });
    });
  }
}
