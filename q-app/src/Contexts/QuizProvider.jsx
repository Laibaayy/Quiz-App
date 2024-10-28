import { createContext, useEffect, useReducer } from "react";

const quizcontext = createContext()
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
            return { ...state, Status: "Active", TimeRemaining: state.questions.length * 30 };
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
                TimeRemaining: state.TimeRemaining - 1, Status: state.TimeRemaining === 0 ? "Finished" : "Active"
            };

        default:
            return state;
    }
}


const QuizProvider = ({ children }) => {
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
    const questionsdata = questions[index]
    return (
        <quizcontext.Provider value={{
            Status,
            questions,
            index,
            answer,
            points,
            hieghestpoints,
            TimeRemaining,
            totalpoints,
            dispatch,
            questionsdata
        }}>
            {children}
        </quizcontext.Provider>
    )
}

export { QuizProvider, quizcontext }