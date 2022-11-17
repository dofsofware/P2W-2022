import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthentificationComponent } from 'app/authentification/authentification.component';
import { CommentJouerComponent } from 'app/comment-jouer/comment-jouer.component';
import { InscriptionComponent } from 'app/inscription/inscription.component';
import { PresentationComponent } from 'app/presentation/presentation.component';
import { ProfilComponent } from 'app/profil/profil.component';
import { SaisieCodeComponent } from 'app/saisie-code/saisie-code.component';
import { PrincipesComponent } from 'app/principes/principes.component';
import { ChoixComponent } from 'app/choix/choix.component';
import { PlayComponent } from 'app/play/play.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'abonne',
        data: { pageTitle: 'play2WinApp.abonne.home.title' },
        loadChildren: () => import('./abonne/abonne.module').then(m => m.AbonneModule),
      },
      { path: 'presentation', component: PresentationComponent },
      { path: 'comment-jouer', component: CommentJouerComponent },
      { path: 'authentification', component: AuthentificationComponent },
      { path: 'inscription', component: InscriptionComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'saisie-code', component: SaisieCodeComponent },
      { path: 'principes', component: PrincipesComponent },
      { path: 'choix', component: ChoixComponent },
      { path: 'play', component: PlayComponent },
      {
        path: 'gains',
        data: { pageTitle: 'play2WinApp.gains.home.title' },
        loadChildren: () => import('./gains/gains.module').then(m => m.GainsModule),
      },
      {
        path: 'question',
        data: { pageTitle: 'play2WinApp.question.home.title' },
        loadChildren: () => import('./question/question.module').then(m => m.QuestionModule),
      },
      {
        path: 'recette',
        data: { pageTitle: 'play2WinApp.recette.home.title' },
        loadChildren: () => import('./recette/recette.module').then(m => m.RecetteModule),
      },
      {
        path: 'infos-abonne',
        data: { pageTitle: 'play2WinApp.infosAbonne.home.title' },
        loadChildren: () => import('./infos-abonne/infos-abonne.module').then(m => m.InfosAbonneModule),
      },
      {
        path: 'mot-de-passe-setting',
        data: { pageTitle: 'play2WinApp.motDePasseSetting.home.title' },
        loadChildren: () => import('./mot-de-passe-setting/mot-de-passe-setting.module').then(m => m.MotDePasseSettingModule),
      },
      {
        path: 'reponse',
        data: { pageTitle: 'play2WinApp.reponse.home.title' },
        loadChildren: () => import('./reponse/reponse.module').then(m => m.ReponseModule),
      },
      {
        path: 'restaure',
        data: { pageTitle: 'play2WinApp.restaure.home.title' },
        loadChildren: () => import('./restaure/restaure.module').then(m => m.RestaureModule),
      },
      {
        path: 'resultat',
        data: { pageTitle: 'play2WinApp.resultat.home.title' },
        loadChildren: () => import('./resultat/resultat.module').then(m => m.ResultatModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
