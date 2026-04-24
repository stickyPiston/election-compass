import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { LocalisedPipe, LocalisedText } from '../localised-pipe';

@Component({
  selector: 'app-welcome-page',
  imports: [FaIconComponent, LocalisedPipe],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css',
  host: {
    class: 'grid h-[calc(100vh-4.5rem)]'
  }
})
export class WelcomePage {
  router = inject(Router);

  open_thesis() {
    this.router.navigate(["theses", "0"]);
  }

  texts: Record<string, LocalisedText> = {
    welcome: { nl: "Welkom bij het kieskompas voor de universiteitsraadsverkiezingen 2025!", en: "Welcome to the election compass for the university council elections 2025!" },
    cta: { nl: "Ga naar de stellingen", en: "Go to the theses" }
  }

  faArrowRight = faArrowRight;
}
