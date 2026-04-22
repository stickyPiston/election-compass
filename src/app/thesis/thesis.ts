import { Component, input } from '@angular/core';
import { ThesisText } from "../thesis-text/thesis-text";
import * as model from "../model";
import { LocalisedPipe, LocalisedText } from '../localised-pipe';
import { faGrin, faMeh, faMehBlank, faSmile, faFrown, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { FieldTree, FormField } from '@angular/forms/signals';


@Component({
  selector: 'app-thesis',
  imports: [ThesisText, FontAwesomeModule, LocalisedPipe],
  templateUrl: './thesis.html',
  styleUrl: './thesis.css',
})
export class Thesis {
  thesis = input.required<model.Thesis>();
  form = input.required<FieldTree<model.ThesisAnswer>>();

  select_option(idx: number) {
    this.form()().value.set(this.answer_possibilities[idx].answer);
  }


  faArrowRight = faArrowRight;
  faXmark = faXmark;
  console = console;
}
