import "./App.css";
import Content from "./Components/Content";
import Heading from "./Components/Heading";
import Loading from "./Components/Loading";
import Error from "./Components/Error";
import Ready from "./Components/Ready";
import Active from "./Components/Active";
import Button from "./Components/Button";
import Progress from "./Components/Progress";
import Finish from "./Components/Finish";
import Timer from "./Components/Timer";
import { useContext } from "react";
import { quizcontext } from "./Contexts/QuizProvider";

function App() {
  const { Status } = useContext(quizcontext);
  return (
    <>
      <div className="App">
        <header>
          <Heading />
          <Content />
        </header>
        {Status === "Ready" && <Ready />}
        {Status === "Error" && <Error />}
        {Status === "Loading" && <Loading />}

        {Status === "Active" && (
          <>
            <Progress />
            <Active />
            <Button />
            <Timer />
          </>
        )}

        {Status === "Finished" && <Finish />}
      </div>
    </>
  );
}

export default App;
