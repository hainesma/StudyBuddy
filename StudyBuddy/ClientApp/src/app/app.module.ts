import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './question.service';
import { FavoriteComponent } from './favorite/favorite.component';
import { FavoriteService } from './favorite.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QuestionComponent,
    FavoriteComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'question', component: QuestionComponent },
      { path: 'favorite', component: FavoriteComponent }
    ])
  ],
  providers: [FavoriteService, QuestionService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
