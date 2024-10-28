import "./App.css";
import Content from "../Components copy/Content";
import Heading from "../Components copy/Heading";
import { useEffect, useReducer } from "react";
import Loading from "../Components copy/Loading";
import Error from "../Components copy/Error";
import Ready from "../Components copy/Ready";
import Active from "../Components copy/Active";
import Button from "../Components copy/Button";
import Progress from "../Components copy/Progress";
import Finish from "../Components copy/Finish";
import Timer from "../Components copy/Timer";
let initialstate = {
  questions: [],
  //Active loading error ready
  Status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  hieghestpoints: 0,
  TimeRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "Datarecieved":
      return { ...state, questions: action.payload, Status: "Ready" };
    case "DataCancelled":
      return { ...state, Status: "Error" };
    case "Start":
      return {
        ...state,
        Status: "Active",
        TimeRemaining: state.questions.length * 30,
      };
    case "AnswerSelected":
      const ques = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === ques.correctOption
            ? state.points + ques.points
            : state.points,
      };
    case "NextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "Finish":
      return {
        ...state,
        Status: "Finished",
        hieghestpoints:
          state.points > state.hieghestpoints
            ? state.points
            : state.hieghestpoints,
      };
    case "Restart":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        hieghestpoints: 0,
        Status: "Ready",
      };
    case "TimeInterval":
      return {
        ...state,
        TimeRemaining: state.TimeRemaining - 1,
        Status: state.TimeRemaining === 0 ? "Finished" : "Active",
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const {
    Status,
    questions,
    index,
    answer,
    points,
    hieghestpoints,
    TimeRemaining,
  } = state;

  useEffect(() => {
    async function MyContent() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        if (!response.ok) throw new Error("Something went wrong");
        const res = await response.json();
        // if (!res.response) throw new Error("Something went wrong");
        dispatch({ type: "Datarecieved", payload: res });
      } catch (error) {
        dispatch({ type: "DataCancelled" });
        console.error("Very wrong", error);
      }
    }

    MyContent();
  }, []);

  const totalpoints = state.questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  return (
    <>
      <div className="App">
        <header>
          <Heading />
          <Content />
        </header>
        {Status === "Ready" && (
          <Ready questionnumber={questions} dispatch={dispatch} />
        )}
        {Status === "Error" && <Error />}
        {Status === "Loading" && <Loading />}

        {Status === "Active" && (
          <>
            <Progress
              points={points}
              questionnumber={questions}
              index={index}
              totalpoints={totalpoints}
              answer={answer}
            />
            <Active
              questiondata={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Button
              dispatch={dispatch}
              answer={answer}
              index={index}
              questions={questions}
            />
            <Timer TimeRemaining={TimeRemaining} dispatch={dispatch} />
          </>
        )}

        {Status === "Finished" && (
          <Finish
            points={points}
            totalpoints={totalpoints}
            hieghestpoints={hieghestpoints}
            dispatch={dispatch}
          />
        )}
      </div>
    </>
  );
}

export default App;
