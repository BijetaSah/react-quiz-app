function ProgressStatus({ numQuestions, index, points, totalPoints }) {
  return (
    <header className="progress">
      <progress min={0} max={numQuestions} value={index + 1}></progress>
      <p>
        {" "}
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        {points} / {totalPoints}
      </p>
    </header>
  );
}

export default ProgressStatus;
