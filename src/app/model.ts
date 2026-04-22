import { LocalisedText } from "./localised-pipe";
import { faGrin, faMeh, faMehBlank, faSmile, faFrown } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/angular-fontawesome';

export type Party = string;

export type Answer = -2 | -1 | 0 | 1 | 2 | null;

export type AnswerPossibility = {
  text: LocalisedText,
  icon: IconDefinition,
  colour: string,
  answer: Answer
};

export const answer_possibilities: AnswerPossibility[] = [
  {
    text: { nl: "Helemaal mee eens", en: "Strongly agree" },
    icon: faGrin,
    colour: "#44ce1b",
    answer: 2
  },
  {
    text: { nl: "Mee eens", en: "Agree" },
    icon: faSmile,
    colour: "#bbdb44",
    answer: 1
  },
  {
    text: { nl: "Neutraal", en: "Neutral" },
    icon: faMehBlank,
    colour: "#a0aec0",
    answer: 0
  },
  {
    text: { nl: "Oneens", en: "Disagree" },
    icon: faMeh,
    colour: "#f2a134",
    answer: -1
  },
  {
    text: { nl: "Helemaal mee oneens", en: "Strongly disagree" },
    icon: faFrown,
    colour: "#e51f1f",
    answer: -2
  }
];

export type ExplanationTextPart = { text: LocalisedText, explanation: LocalisedText };
export type ThesisTextPart = ExplanationTextPart | LocalisedText;
export type ThesisText = ThesisTextPart[];

export type PartyAnswer = {
  answer: Answer,
  explanation: LocalisedText,
};

export type Thesis = {
  text: ThesisText,
  party_answers: Record<Party, PartyAnswer>;
};

export type ThesisAnswer = number | null;
export type FormModel = ThesisAnswer[];
