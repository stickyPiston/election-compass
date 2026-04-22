import { Component, inject, signal } from '@angular/core';
import { form, min } from '@angular/forms/signals';
import * as model from "../model";
import { Thesis } from '../thesis/thesis';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';

type View = number | "confirm";

@Component({
  selector: 'app-theses-page',
  imports: [Thesis, FaIconComponent, NgClass],
  templateUrl: './theses-page.html',
  styleUrl: './theses-page.css',
  host: {
    class: 'h-[calc(100vh-6.5rem)]'
  }
})
export class ThesesPage {
  router = inject(Router);
  activated_route = inject(ActivatedRoute);
  current_view = toSignal(this.activated_route.paramMap.pipe(
    map(m => {
      const param = m.get("id");
      return param === "confirm" ? param : Number(param);
    })
  ), { requireSync: true });

  model = signal<model.FormModel>([null, null]);
  theses_form = form(this.model, schema_path => {
    // min(schema_path[0], -2)
  });

  skip_thesis(event: Event) {
    const view = this.current_view();
    if (view !== "confirm") {
      this.theses_form().value.update(answers =>
        answers.map((answer, index) => index === view ? null : answer));
      this.next_thesis(event);
    }
  }

  navigate_to(event: Event, id: number) {
    event.preventDefault();
    this.router.navigate(["theses", String(id)]);
  }

  next_thesis(event: Event) {
    const view = this.current_view();
    if (view !== "confirm") {
      if (view + 1 < this.theses.length) {
        this.navigate_to(event, view + 1);
      } else {
        event.preventDefault();
        this.router.navigate(["theses", "confirm"]);
      }
    }
  }

  thesis1: model.Thesis = {
    text: [
      { nl: "De", en: "The" },
      {
        text: { nl: "Haskell Foundation", en: "Haskell Foundation" },
        explanation: { nl: "Organisatie die Haskell beheert.", en: "Organisation that manages Haskell." }
      },
      { nl: "moet afhankelijke types toevoegen aan Haskell.", en: "should add dependent types to Haskell." }
    ],
    party_answers: {}
  };
  thesis2: model.Thesis = {
    text: [
      {
        nl: "Koffie op de UU moet gratis worden voor alle studenten.",
        en: "Coffee at UU should be free for all students."
      }
    ],
    party_answers: {}
  };
  theses = [this.thesis1, this.thesis2];

  faXmark = faXmark;
  faArrowRight = faArrowRight;
}
