import { useQuiz } from "../context/QuizContext";
import Option from "./Option";
function Questions() {
  // const hasAnswered = answer !== null;
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} />
    </div>
  );
}

export default Questions;
