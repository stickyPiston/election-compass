import { Component, inject } from '@angular/core';
import { ThesesService } from '../theses-service';
import { Answer, answer_possibilities, is_explanation_part, ThesisText } from '../model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faMinus } from '@fortawesome/free-solid-svg-icons';
import { LocalisedPipe } from '../localised-pipe';
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

  faMinus = faMinus;
  faArrowRight = faArrowRight;
}
