export class Question {
  id: number;
  question: string;
  test_id: 1;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  image: string;
}

export class Answer {
  questionId: number;
  answerId: number;
}

