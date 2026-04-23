import { Component, input } from '@angular/core';
import { ThesisText } from "../thesis-text/thesis-text";
import * as model from "../../model";
import { LocalisedPipe } from '../../localised-pipe';
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FieldTree } from '@angular/forms/signals';


@Component({
  selector: 'app-thesis',
  imports: [ThesisText, FontAwesomeModule, LocalisedPipe],
  templateUrl: './thesis.html',
  styleUrl: './thesis.css',
})
export class Thesis {
  thesis = input.required<model.ThesisText>();
  form = input.required<FieldTree<model.ThesisAnswer>>();

  select_option(idx: number) {
    this.form()().value.set(model.answer_possibilities[idx].answer);
  }

  faArrowRight = faArrowRight;
  faXmark = faXmark;
  model = model;
}
