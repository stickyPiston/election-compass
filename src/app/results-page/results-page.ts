import { Component, computed, inject, signal } from '@angular/core';
import { Answer, answer_possibilities, is_explanation_part, ThesisText } from '../model';
import _ from "lodash";
import { ThesesService } from '../theses-service';
import { parties, theses } from "../theses.json";
import { ThesisText as ThesisTextComponent } from '../theses-page/thesis-text/thesis-text';
import { faCheckCircle, faChevronDown, faChevronUp, faMinus, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalisedPipe, LocalisedText } from '../localised-pipe';
import { NgClass } from "@angular/common";
import { Localisation } from '../localisation';

@Component({
  selector: 'app-results-page',
  imports: [FontAwesomeModule, ThesisTextComponent, LocalisedPipe, NgClass],
  templateUrl: './results-page.html',
  styleUrl: './results-page.css',
})
export class ResultsPage {
  theses_service = inject(ThesesService);
  localisation = inject(Localisation);

  opened = signal(parties.map(_ => false));

  answered_count = computed(() => this.theses_service.own_answers().filter(ans => ans !== null).length);

  similarity(own_answers: Answer[], party_answers: (-2 | -1 | 1 | 2)[]) {
    // Filter out dimensions which haven't been answered
    const vectors = _.chain(own_answers)
      .zip(party_answers)
      .filter(([a, _b]) => a !== null)
      .value() as [(-2 | -1 | 0 | 1 | 2), (-2 | -1 | 1 | 2)][];

    const dot = _.sumBy(vectors, ([a, b]) => a * b);
    const [reduced_own_answers, reduced_party_answers] = _.unzip(vectors);
    const denom = Math.sqrt(_.sumBy(reduced_own_answers, a => a * a))
      * Math.sqrt(_.sumBy(reduced_party_answers, a => a * a));

    return dot / denom;
  }

  percentage(similarity: number) {
    return _.round((similarity + 1) / 2 * 100);
  }

  sorted_parties = computed(() => {
    const own_answers = this.theses_service.own_answers();

    return _.chain(parties)
      .map(party => {
        const answer_scores = party.answers.map(ans => ans.answer) as (-2 | -1 | 1 | 2)[];
        return { ...party, similarity: this.similarity(own_answers, answer_scores) };
      })
      .sortBy("similarity")
      .reverse()
      .value();
  });

  toggle_explanation(to_toggle_idx: number) {
    this.opened.update(opened => opened.map((open, idx) => idx === to_toggle_idx ? !open : open));
  }

  display_title(text: ThesisText) {
    const texts = text.map(part => is_explanation_part(part) ? part.text : part);
    return { nl: texts.reduce((ac, text) => ac + text.nl, ""), en: texts.reduce((ac, text) => ac + text.en, "") }
  }

  get_answer_possibility(answer: number) {
    return answer_possibilities.find(poss => poss.answer === answer)!;
  }

  similarity_icon(own_answer: number, party_answer: number) {
    if ((own_answer > 0 && party_answer > 0) || (own_answer < 0 && party_answer < 0))
      return { classes: "text-green", icon: faCheckCircle };
    else
      return { classes: "text-red", icon: faXmarkCircle };
  }

  answer_text(answer: number) {
    return answer_possibilities.find(poss => poss.answer === answer)!.text;
  }

  texts: Record<string, LocalisedText> = {
    results: { nl: "Resultaten", en: "Results" },
    match: { nl: "overeenkomst", en: "match" },
    your_answer: { nl: "Jouw antwoord", en: "Your answer" },
    answer: { nl: "antwoord", en: "answer" },
    explanation: { nl: "uitleg", en: "explanation" },
    similarity_link: { nl: "https://nl.wikipedia.org/wiki/Cosinusgelijkenis", en: "https://en.wikipedia.org/wiki/Cosine_similarity" },
    cosine_similarity: { nl: "cosinusgelijkenis", en: "cosine similarity" },
    subtitle_1: { nl: "De overeenkomst van jouw antwoorden met de antwoorden van de partijen is berekend op basis van ", en: "The matching percentage of your answers and the parties' answers is calculated by use of the " },
    subtitle_2: { nl: " op de ", en: " on the " },
    subtitle_3: { nl: " betantwoorde stellingen. Overgeslagen stellingen worden niet meegenomen in de berekening en kunnen daardoor de resultaten minder accuraat maken.", en: " answered theses. Skipped theses are not used in the calculation and can therefore make the results less accurate." }
  }

  parties = parties;
  theses = theses;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faMinus = faMinus;
}
