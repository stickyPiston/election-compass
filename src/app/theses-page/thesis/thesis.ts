import { Component, input } from '@angular/core';
import { ThesisText } from "../thesis-text/thesis-text";
import * as model from "../../model";
import { LocalisedPipe, LocalisedText } from '../../localised-pipe';
import { faArrowRight, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FieldTree, FormField } from '@angular/forms/signals';


@Component({
  selector: 'app-thesis',
  imports: [ThesisText, FontAwesomeModule, LocalisedPipe, FormField],
  templateUrl: './thesis.html',
  styleUrl: './thesis.css',
})
export class Thesis {
  thesis = input.required<model.ThesisText>();
  form = input.required<FieldTree<model.ThesisAnswer>>();

  select_option(idx: number) {
    this.form()().value.update(answer => ({ ...answer, answer: model.answer_possibilities[idx].answer }));
  }

  toggle_important() {
    this.form()().value.update(answer => ({ ...answer, important: !answer.important }));
  }

  texts: Record<string, LocalisedText> = {
    important: { nl: "Belangrijk", en: "Important" }
  }

  faArrowRight = faArrowRight;
  faXmark = faXmark;
  faExclamation = faExclamation;
  model = model;
}
