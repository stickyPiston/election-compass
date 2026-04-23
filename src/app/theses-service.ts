import { computed, effect, Injectable, resource, signal } from '@angular/core';
import { Answer, Thesis, ThesisText } from './model';
import { FieldTree, form } from '@angular/forms/signals';
import { theses } from "./theses.json";

@Injectable({
  providedIn: 'root',
})
export class ThesesService {
  form_model = signal<Answer[]>(theses.map(_ => 2));
  answer_form: FieldTree<Answer[]> = form(this.form_model);

  own_answers = computed(() => this.answer_form().value());

  constructor() {
    const answers = localStorage.getItem("answers");
    if (answers) {
      this.answer_form().value.set(JSON.parse(answers));
    }

    effect(() => {
      localStorage.setItem("answers", JSON.stringify(this.form_model()));
    });
  }

  theses_with_answers: { thesis: ThesisText, answer: FieldTree<Answer> }[] = theses.map((thesis, idx) => ({
    thesis, answer: this.answer_form[idx]
  }));

  update_answer(idx: number, answer: Answer) {
    if (idx >= theses.length)
      throw new Error("Invalid thesis index");

    this.answer_form[idx]().value.set(answer);
  }
}
