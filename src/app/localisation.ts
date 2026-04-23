import { Injectable, signal } from '@angular/core';

type Locale = "en" | "nl";

@Injectable({
  providedIn: 'root',
})
export class Localisation {
  current_language = signal<Locale>("en");
}
