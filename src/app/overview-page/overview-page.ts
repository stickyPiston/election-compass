import { Component, inject } from '@angular/core';
import { ThesesService } from '../theses-service';
import { Answer, answer_possibilities, is_explanation_part, ThesisText } from '../model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faMinus } from '@fortawesome/free-solid-svg-icons';
import { LocalisedPipe, LocalisedText } from '../localised-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-overview-page',
  imports: [FontAwesomeModule, LocalisedPipe, RouterLink],
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.css',
})
export class OverviewPage {
  theses = inject(ThesesService);

  display_title(text: ThesisText) {
    const texts = text.map(part => is_explanation_part(part) ? part.text : part);
    return { nl: texts.reduce((ac, text) => ac + text.nl, ""), en: texts.reduce((ac, text) => ac + text.en, "") }
  }

  get_answer_possibility(answer: Answer) {
    return answer_possibilities.find(poss => poss.answer === answer)!;
  }

  texts: Record<string, LocalisedText> = {
    see_results: { nl: "Bekijk resultaten", en: "View results" },
    title: { nl: "Overzicht van alle stellingen", en: "Overview of all theses" },
    subtitle: { nl: "Hier is een overzicht van alle stellingen en de antwoorden die je hebt gegeven. Controleer of je alle stellingen hebt beantwoord, en zoniet klik op een stelling in de lijst om alsnog een antwoord te kunnen geven.", en: "Here is an overview of all theses and your answers to them. Check whether you have answered all of the these, and if not, click a thesis to quickly answer it still." }
  }

  faMinus = faMinus;
  faArrowRight = faArrowRight;
}
