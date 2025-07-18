import { useQuiz } from "../context/QuizContext";

function EndScreen() {
  const { points, totalPoints, highScore, dispatch } = useQuiz();
  return (
    <div>
      <p className="result">
        You scored {points}/ {totalPoints}
      </p>
      <p className="highscore">(Highscore : {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default EndScreen;
