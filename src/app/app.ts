import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Localisation } from './localisation';
import { LocalisedPipe, LocalisedText } from './localised-pipe';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LocalisedPipe, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  localisation = inject(Localisation);

  toggle_language() {
    this.localisation.current_language.update(lang => lang === "nl" ? "en" : "nl");
  }

  texts: Record<string, LocalisedText> = {
    title: { nl: "Kieskompas Universiteitsraadsverkiezingen 26/27", en: "Election Compass University Council 26/27" }
  };
}
