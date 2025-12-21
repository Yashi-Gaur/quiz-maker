import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
    
        const res = await fetch("http://localhost:8000/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, topic })
        });
    
        const data = await res.json();

        setTopic(data["quiz_title"])
        setQuestions(data["questions"]);
        setOptions(data["options"]);
        setAnswers(data["answers"]);

        setLoading(false);
        setStart(true)
    };

    const handleclick = () => {
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

    return(
        <>
            <h2>Quiz Maker</h2>
            <p>Enter a URL and an optional topic to create a quiz</p>
            <div style={{display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px"}}>
                <input
                    type="text"
                    placeholder="Website URL"
                    value={url}
                    onChange={(e) => {setUrl(e.target.value)}}
                />
                <input
                    type="text"
                    placeholder="Topic"
                    value={topic}
                    onChange={(e) => {setTopic(e.target.value)}}
                />
            </div>
            <button onClick={handleSubmit} disabled={loading} style={{marginRight: "10px"}}>
                {loading ? "Generating...": "Generate Quiz"}
            </button>
            
            {start &&
                <button onClick={handleclick}>
                    Start
                </button>
            }
        </>
    )
}

export default Home;
