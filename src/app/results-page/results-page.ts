import { Component, computed, inject, signal } from '@angular/core';
import { Answer, answer_possibilities, is_explanation_part, ThesesData, ThesisText } from '../model';
import _ from "lodash";
import { ThesesService } from '../theses-service';
import { parties, theses } from "../theses.json";
import { ThesisText as ThesisTextComponent } from '../theses-page/thesis-text/thesis-text';
import { faCheckCircle, faChevronDown, faChevronUp, faCircleInfo, faExclamation, faMinus, faTrophy, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalisedPipe, LocalisedText } from '../localised-pipe';
import { NgClass, NgOptimizedImage } from "@angular/common";
import { Localisation } from '../localisation';

@Component({
  selector: 'app-results-page',
  imports: [FontAwesomeModule, ThesisTextComponent, LocalisedPipe, NgClass, NgOptimizedImage],
  templateUrl: './results-page.html',
  styleUrl: './results-page.css',
})
export class ResultsPage {
  theses_service = inject(ThesesService);
  localisation = inject(Localisation);

  opened = signal(parties.map(_ => false));

  answered_count = computed(() => this.theses_service.own_answers().filter(ans => ans !== null).length);

  similarity(weights: (1 | 2)[], own_answers: Answer[], party_answers: (-2 | -1 | 1 | 2)[]) {
    // Filter out dimensions which haven't been answered
    const vectors = _.chain(weights as (number | null)[])
      .zip(own_answers, party_answers)
      .filter(([_w, a, _b]) => a !== null)
      .value() as [number, number, number][];

    const dot = _.sumBy(vectors, ([w, a, b]) => w * a * b);
    const [reduced_weights, reduced_own_answers, reduced_party_answers] = _.unzip(vectors);
    const denom =
      Math.sqrt(_.sum(_.zipWith(reduced_weights, reduced_own_answers, (w, a) => w * a * a)))
      * Math.sqrt(_.sum(_.zipWith(reduced_weights, reduced_party_answers, (w, a) => w * a * a)));

    return dot / denom;
  }

  percentage(similarity: number) {
    return _.round((similarity + 1) / 2 * 100);
  }

  sorted_parties = computed(() => {
    const own_answers = this.theses_service.own_answers();

    return _.chain(parties as ThesesData["parties"])
      .map(party => {
        const answer_scores = party.answers.map(ans => ans.answer) as (-2 | -1 | 1 | 2)[];
        const own_scores = own_answers.map(answer => answer.answer) as Answer[];
        const weights = own_answers.map(answer => answer.important ? 2 : 1);
        return { ...party, similarity: this.similarity(weights, own_scores, answer_scores) };
      })
      .sortBy("similarity")
      .reverse()
      .value();
  });

  highest_similarity = computed(() => this.sorted_parties()[0].similarity);

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

  answer_text(answer: number | null) {
    return answer_possibilities.find(poss => poss.answer === answer)!.text;
  }

  strip_protocol(address: string) {
    const url = new URL(address);
    return `${url.hostname}${url.pathname}`;
  }

  texts: Record<string, LocalisedText> = {
    results: { nl: "Resultaten", en: "Results" },
    match: { nl: "overeenkomst", en: "match" },
    your_answer: { nl: "Jouw antwoord", en: "Your answer" },
    answer: { nl: "antwoord", en: "answer" },
    explanation: { nl: "uitleg", en: "explanation" },
    similarity_link: { nl: "https://nl.wikipedia.org/wiki/Cosinusgelijkenis", en: "https://en.wikipedia.org/wiki/Cosine_similarity" },
    cosine_similarity: { nl: "cosinusgelijkenis", en: "cosine similarity" },
    subtitle_1: { nl: "De overeenkomst van jouw antwoorden met de antwoorden van de partijen is berekend op basis van gewogen ", en: "The matching percentage of your answers and the parties' answers is calculated by use of weighted " },
    subtitle_2: { nl: " op de ", en: " on the " },
    subtitle_3: { nl: " beantwoorde stellingen. Overgeslagen stellingen worden niet meegenomen in de berekening en kunnen daardoor de resultaten minder accuraat maken.", en: " answered theses. Skipped theses are not used in the calculation and can therefore make the results less accurate." },
    elections_link: { nl: "https://uu.nl/verkiezingen", en: "https://uu.nl/elections" },
    good_to_know: { nl: "Goed om te weten", en: "Good to know" },
    good_to_know_text: { nl: "Deze stemwijzer behandelt een beperkt aantal stellingen. Het is daarom aan te raden om ook de websites en andere kanalen van de deelnemende partijen te bekijken voor een breder beeld van hun standpunten en prioriteiten. Deze zijn hierboven te vinden onder elk van de uitslagen van de partijen.", en: "This election compass covers a limited number of theses. We therefore recommend that you also consult the websites and other channels of the participating parties to gain a broader picture of their positions and priorities. These can be found above, under each of the parties’ results." },
    disclaimer_text: { nl: "Deze stemwijzer is gemaakt door de Universiteitsraad van de Universiteit Utrecht. Zie de uitkomst vooral als een hulpmiddel, niet als een definitief stemadvies. Kijk voor meer informatie over de verkiezingen op ", en: "This election compass has been created by the University Council of Utrecht University. Please regard the results primarily as a tool, not as definitive voting advice. For more information about the elections, visit " },
    best_match: { nl: "Grootste overeenkomst", en: "Best match" },
    answers: { nl: "antwoorden op de stellingen", en: "answers to the theses" }
  }

  parties = parties as ThesesData["parties"];
  theses = theses as ThesesData["theses"];
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faExclamation = faExclamation;
  faCircleInfo = faCircleInfo;
  faTrophy = faTrophy;
  faMinus = faMinus;
}
