import { inject, Pipe, PipeTransform } from '@angular/core';
import { Localisation } from './localisation';

export type LocalisedText = { nl: string, en: string };

@Pipe({
  name: 'localised',
  pure: false
})
export class LocalisedPipe implements PipeTransform {
  localisation = inject(Localisation);

  is_localised(value: any): value is LocalisedText {
    return Object.hasOwn(value, "en") && Object.hasOwn(value, "nl");
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    if (this.is_localised(value)) {
      return value[this.localisation.current_language()];
    } else {
      throw new Error("");
    }
  }
}
