import { Component, input } from '@angular/core';
import * as model from "../model";
import { LocalisedPipe } from "../localised-pipe";

@Component({
  selector: 'app-thesis-text',
  imports: [LocalisedPipe],
  templateUrl: './thesis-text.html',
  styleUrl: './thesis-text.css',
})
export class ThesisText {
  text = input.required<model.ThesisText>();

  is_decorated(part: model.ThesisTextPart): part is model.ExplanationTextPart {
    return Object.hasOwn(part, "explanation");
  }
}
