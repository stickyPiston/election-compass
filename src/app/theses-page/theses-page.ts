import { Component, inject } from '@angular/core';
import { Thesis } from './thesis/thesis';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark, faArrowRight, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { theses } from "../theses.json";
import { ThesesService } from '../theses-service';
import { LocalisedPipe, LocalisedText } from '../localised-pipe';

@Component({
  selector: 'app-theses-page',
  imports: [Thesis, FaIconComponent, LocalisedPipe],
  templateUrl: './theses-page.html',
  styleUrl: './theses-page.css',
})
export class ThesesPage {
  router = inject(Router);
  activated_route = inject(ActivatedRoute);
  theses_service = inject(ThesesService);

  current_view = toSignal(
    this.activated_route.paramMap.pipe(
      map(param_map => Number(param_map.get("id")!))
    ),
    { requireSync: true }
  );

  model = this.theses_service.form_model;
  theses_form = this.theses_service.answer_form;

  skip_thesis(event: Event) {
    this.theses_form().value.update(answers =>
      answers.map((answer, index) => index === this.current_view() ? { ...answer, answer: null } : answer));
    this.next_thesis(event);
  }

  navigate_to(event: Event, id: number) {
    event.preventDefault();
    this.router.navigate(["theses", String(id)]);
  }

  next_thesis(event: Event) {
    const view = this.current_view();
    if (view + 1 < theses.length) {
      this.navigate_to(event, view + 1);
    } else {
      event.preventDefault();
      this.router.navigate(["overview"]);
    }
  }

  prev_thesis(event: Event) {
    const view = this.current_view();
    this.navigate_to(event, Math.max(0, view - 1));
  }

  texts: Record<string, LocalisedText> = {
    next: { nl: "Volgende", en: "Next" },
    skip: { nl: "Stelling overslaan", en: "Skip thesis" },
    prev: { nl: "Vorige", en: "Back" },
    thesis: { nl: "Stelling", en: "Thesis" },
    out_of: { nl: "van de", en: "out of" },
    complete: { nl: "Resultaten", en: "Results" }
  }

  theses = theses;
  faXmark = faXmark;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
}
