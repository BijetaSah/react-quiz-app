import { useEffect } from "react";

function Tick({ secondsRemaining, dispatch }) {
  const min = String(Math.floor(secondsRemaining / 60)).padStart(2, 0);
  const sec = String(secondsRemaining % 60).padStart(2, 0);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <button className="timer btn">{`${min < 10 ? min.padStart(2, 0) : min} : ${
      sec < 10 ? sec.padStart(2, 0) : sec
    }`}</button>
  );
}
export default Tick;
