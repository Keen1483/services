import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { CampaniesComponent } from './components/campanies/campanies.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FaqComponent } from './components/faq/faq.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { IntroSectionDetailsComponent } from './components/intro-section/intro-section-details/intro-section-details.component';
import { LearnMoreComponent } from './components/services/learn-more/learn-more.component';
import { SigninComponent } from './components/auths/signin/signin.component';
import { SignupComponent } from './components/auths/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { MailsComponent } from './components/account/mails/mails.component';
import { QuestionsComponent } from './components/account/questions/questions.component';
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { MailDetailsComponent } from './components/account/mails/mail-details/mail-details.component';
import { QuestionDetailsComponent } from './components/account/questions/question-details/question-details.component';
import { BecomeAffiliateComponent } from './app-confidences/become-affiliate/become-affiliate.component';
import { HelpComponent } from './app-confidences/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroSectionComponent,
    CampaniesComponent,
    ServicesComponent,
    TestimonialsComponent,
    FaqComponent,
    PortfolioComponent,
    ContactComponent,
    FooterComponent,
    HomeViewComponent,
    PageNotFoundComponent,
    IntroSectionDetailsComponent,
    LearnMoreComponent,
    SigninComponent,
    SignupComponent,
    AccountComponent,
    ProfileComponent,
    MailsComponent,
    QuestionsComponent,
    DashboardComponent,
    MailDetailsComponent,
    QuestionDetailsComponent,
    BecomeAffiliateComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
