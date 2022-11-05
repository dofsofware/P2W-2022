import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'abonne',
        data: { pageTitle: 'play2WinApp.abonne.home.title' },
        loadChildren: () => import('./abonne/abonne.module').then(m => m.AbonneModule),
      },
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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
