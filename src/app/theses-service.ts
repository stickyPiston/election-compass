import { computed, Injectable, signal } from '@angular/core';
import { ThesisAnswer } from './model';
import { FieldTree, form } from '@angular/forms/signals';
import { theses } from "./theses.json";

@Injectable({
  providedIn: 'root',
})
export class ThesesService {
  form_model = signal<ThesisAnswer[]>(theses.map(_ => ({ answer: null, important: false })));
  answer_form: FieldTree<ThesisAnswer[]> = form(this.form_model);

  own_answers = computed(() => this.answer_form().value());

  theses_with_answers = computed(() =>
    theses.map((thesis, idx) => ({ thesis, answer: this.answer_form[idx]().value() }))
  );
}
