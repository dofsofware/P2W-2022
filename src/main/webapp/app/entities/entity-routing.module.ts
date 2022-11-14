import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentJouerComponent } from 'app/comment-jouer/comment-jouer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'abonne',
        data: { pageTitle: 'play2WinApp.abonne.home.title' },
        loadChildren: () => import('./abonne/abonne.module').then(m => m.AbonneModule),
      },

      { path: 'comment-jouer', component: CommentJouerComponent },
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
        path: 'authentification',
        data: { pageTitle: 'play2WinApp.authentification.home.title' },
        loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule),
      },
      {
        path: 'choix',
        data: { pageTitle: 'play2WinApp.choix.home.title' },
        loadChildren: () => import('./choix/choix.module').then(m => m.ChoixModule),
      },
      {
        path: 'infos-abonne',
        data: { pageTitle: 'play2WinApp.infosAbonne.home.title' },
        loadChildren: () => import('./infos-abonne/infos-abonne.module').then(m => m.InfosAbonneModule),
      },
      {
        path: 'incription',
        data: { pageTitle: 'play2WinApp.incription.home.title' },
        loadChildren: () => import('./incription/incription.module').then(m => m.IncriptionModule),
      },
      {
        path: 'mot-de-passe-setting',
        data: { pageTitle: 'play2WinApp.motDePasseSetting.home.title' },
        loadChildren: () => import('./mot-de-passe-setting/mot-de-passe-setting.module').then(m => m.MotDePasseSettingModule),
      },
      {
        path: 'play',
        data: { pageTitle: 'play2WinApp.play.home.title' },
        loadChildren: () => import('./play/play.module').then(m => m.PlayModule),
      },
      {
        path: 'presentation',
        data: { pageTitle: 'play2WinApp.presentation.home.title' },
        loadChildren: () => import('./presentation/presentation.module').then(m => m.PresentationModule),
      },
      {
        path: 'principes',
        data: { pageTitle: 'play2WinApp.principes.home.title' },
        loadChildren: () => import('./principes/principes.module').then(m => m.PrincipesModule),
      },
      {
        path: 'profil',
        data: { pageTitle: 'play2WinApp.profil.home.title' },
        loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule),
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
      {
        path: 'saisie-code',
        data: { pageTitle: 'play2WinApp.saisieCode.home.title' },
        loadChildren: () => import('./saisie-code/saisie-code.module').then(m => m.SaisieCodeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
