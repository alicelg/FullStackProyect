export class Question {
  id: number;
  question: string;
  test_id: 1;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  image: string;
}

export class Answer {
  questionId: number;
  answerId: number;
}

export class TestResult {
  end_date: string;
  id: number;
  init_date: string;
  percent_result: number;
  right_answers: number;
  test_id: number;
  times_repeated: number;
  total_answers: number;
  user_id: number;
  political_orientation: string;
}

