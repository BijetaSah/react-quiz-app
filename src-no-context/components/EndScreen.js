function EndScreen({ points, totalPoints, highScore, dispatch }) {
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
