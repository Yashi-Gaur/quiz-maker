import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Quiz() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { url, topic, questions, options, answers } = state;
    const [qno, setQno] = useState(0);
    const [userAnswers, setUserAnswers] = useState([0,0,0,0,0,0,0,0,0,0]);

    const handleSelect = (qno: number, optionId: number) => {
        setUserAnswers((prev) => ({
            ...prev,
            [qno]: optionId
          }));
    }
    
    const handlePrevious = () => {
        setQno((qno) => (qno-1))
    }
    const handleNext = () => {
        if(qno === 9) {
            let score = 0;
            for (let i = 0; i < answers.length; i++) {
                if (userAnswers[i] === answers[i]) {
                    score++;
                }
            }
            navigate("/result", {
                state: {
                    url: url,
                    topic: topic,
                    questions: questions,
                    options: options,
                    answers: answers,
                    score: score
                }
              });
        }
        setQno((qno) => (qno+1))
    }

    return (
        <>
            <h2>{topic}</h2>
            <p>Source: {url}</p>

            <h3>Question {qno + 1}</h3>
            <h4>{questions[qno]}</h4>
            <div style={{marginBottom: "15px"}}> 
                {options[qno].map((opt: string, oIndex: number) => (
                    <label key={oIndex} style={{ display: "block" }}>
                    <input
                        type="radio"
                        name={`q-${qno}`}
                        checked={userAnswers[qno] === oIndex+1}
                        onChange={() => handleSelect(qno, oIndex + 1)}
                    />
                    {opt}
                    </label>
                ))}
            </div>

            <button onClick={handlePrevious} disabled={qno===0} style={{marginRight: "15px"}}>
                Previous
            </button>
            <button onClick={handleNext}>
                {qno===9? "Submit": "Next"}
            </button>
        </>

    )
}

export default Quiz;