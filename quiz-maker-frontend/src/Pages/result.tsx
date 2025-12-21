import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Result() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { url, topic, questions, options, answers, score } = state;

    const handleRetry = () => {
        navigate("/quiz", {
            state: {
                url: url,
                topic: topic,
                questions: questions,
                options: options,
                answers: answers
            }
          });
    }

    const handleHome = () => {
        navigate("/");
    }

    return (
        <>
            <h2>Results</h2>
            <p>Score: {score*10}</p>
            <button onClick={handleRetry} style={{marginRight: "15px"}}>
                Retry
            </button>
            <button onClick={handleHome}>
                Make a new quiz
            </button>
        </>
        
        
    )
}

export default Result;