import { IQuestion } from 'app/entities/question/question.model';
import { EtatQuestionPlay } from './etatQuestionPlay.model';

export interface IQuestionPlay {
  question?: IQuestion;
  etat?: EtatQuestionPlay;
}

export class QuestionPlay implements IQuestionPlay {
  constructor(public question?: IQuestion, public etat?: EtatQuestionPlay) {}
}
