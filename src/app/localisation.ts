import { effect, Injectable, signal } from '@angular/core';

type Locale = "en" | "nl";

@Injectable({
  providedIn: 'root',
})
export class Localisation {
  current_language = signal<Locale>("en");

  constructor() {
    const set_locale = localStorage.getItem("locale") as Locale | null;
    this.current_language.set(
      set_locale ?? (window.navigator.language.startsWith("nl") ? "nl" : "en")
    );

    effect(() => {
      localStorage.setItem("locale", this.current_language());
    });
  }
}
