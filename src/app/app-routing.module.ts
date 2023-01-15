import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { IntroSectionDetailsComponent } from './components/intro-section/intro-section-details/intro-section-details.component';
import { LearnMoreComponent } from './components/services/learn-more/learn-more.component';
import { SignupComponent } from './components/auths/signup/signup.component';
import { SigninComponent } from './components/auths/signin/signin.component';
import { AuthUserGuard } from './guards/auth-user.guard';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { MailsComponent } from './components/account/mails/mails.component';
import { QuestionsComponent } from './components/account/questions/questions.component';
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { MailDetailsComponent } from './components/account/mails/mail-details/mail-details.component';
import { QuestionDetailsComponent } from './components/account/questions/question-details/question-details.component';
import { BecomeAffiliateComponent } from './app-confidences/become-affiliate/become-affiliate.component';
import { HelpComponent } from './app-confidences/help/help.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeViewComponent
  },
  {
    path: 'intro-section/get-in-touch',
    component: IntroSectionDetailsComponent
  },
  {
    path: 'services/:name',
    component: LearnMoreComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'projects',
        component: MailsComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'questions/:email_question',
        component: QuestionDetailsComponent
      },
      {
        path: 'projects/:email_project',
        component: MailDetailsComponent
      }
    ]
  },
  {
    path: 'become-affiliate',
    component: BecomeAffiliateComponent,
    canActivate: [AuthUserGuard]
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
