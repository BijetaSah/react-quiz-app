import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // loading,error,ready,active
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  const question = state.questions.at(state.index);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}
const QuizContext = createContext();
function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;
  const totalPoints = questions
    .map((question) => question.points)
    .reduce((points, acc) => acc + points, 0);

  // function hanldeStartQuiz() {
  //   dispatch({ type: "start" });
  // }

  // function handleNewAnswer() {
  //   dispatch({ type: "newAnswer", payload: index });
  // }

  // function handleTick() {
  //   dispatch({ type: "tick" });
  // }

  // function handleNextQuestion() {
  //   dispatch({ type: "nextQuestion" });
  // }
  // function handleFinishQuiz() {
  //   dispatch({ type: "finish" });
  // }

  // function handleRestart() {
  //   dispatch({ type: "restart" });
  // }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
