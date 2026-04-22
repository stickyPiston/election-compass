import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome-page',
  imports: [FaIconComponent],
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

  faArrowRight = faArrowRight;
}
