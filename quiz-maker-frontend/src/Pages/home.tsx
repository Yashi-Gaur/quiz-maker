import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PixelBlast from "@/components/PixelBlast";
import RoundedInput from "@/components/roundedInput";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";

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
        <div style={{ 
            width: '100%', 
            height: '100vh', 
            position: 'relative', 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }}>
            <PixelBlast
                variant="square"
                pixelSize={5}
                color="rgba(126, 82, 160, 0.8)"
                patternScale={3}
                patternDensity={1.2}
                pixelSizeJitter={0.5}
                enableRipples
                rippleSpeed={0.4}
                rippleThickness={0.12}
                rippleIntensityScale={1.5}
                liquid={false}
                speed={0.6}
                edgeFade={0.10}
                transparent
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            />
            <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
                <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "'Fascinate Inline', cursive",
                      fontWeight: 900,
                      color: "#E6BCCD",
                    }}
                >
                    Quiz Whiz
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                      color: "#E6BCCD",
                      marginBottom: "20px"
                    }}
                >
                    Enter a URL and an optional topic to create a quiz
                </Typography>
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    handleSubmit();}}
                >
                    <div style={{display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px"}}>
                        <RoundedInput 
                            id="outlined-basic" 
                            label="Website URL" 
                            variant="outlined" 
                            required
                            value={url}
                            onChange={(e) => {setUrl(e.target.value)}}
                        />
                        <RoundedInput
                            type="text"
                            label="Topic"
                            value={topic}
                            onChange={(e) => {setTopic(e.target.value)}}
                            sx={{width: "280px"}}
                        />
                    </div>
                    <div style={{
                            width: "400px",
                            margin: "0 auto",          
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px"
                        }}
                    >
                        <LoadingButton 
                            type="submit" 
                            variant="contained" 
                            loading={loading} 
                            loadingPosition="start"
                            
                            sx={{
                                width: "170px",
                                borderRadius: "999px",
                                backgroundColor: loading
                                    ? "rgba(230, 188, 205, 0.5)"
                                    : "#E6BCCD",
                                color: loading
                                    ? "rgba(2, 4, 9, 0.4)"
                                    : "#020409",
                                cursor: loading ? "not-allowed" : "pointer",
                                "&:hover": {
                                    backgroundColor: loading
                                        ? "rgba(230, 188, 205, 0.5)"
                                        : "#C86A90"
                                },
                                "&.Mui-disabled": {
                                    backgroundColor: loading
                                        ? "rgba(230, 188, 205, 0.5)"
                                        : "#E6BCCD",
                                    color: loading
                                        ? "rgba(2, 4, 9, 0.4)"
                                        : "#020409",
                                    opacity: 1
                                }
                            }}
                        >
                            {loading ? "Generating...": "Generate Quiz"}
                        </LoadingButton>
                        
                        {start &&
                            <Button 
                                onClick={handleclick}
                                sx={{
                                    width: "170px",
                                    backgroundColor: "#E6BCCD",
                                    color: "#020409",
                                    borderRadius: "999px",
                                    "&:hover": {
                                        backgroundColor: "#C86A90"
                                    },
                                }}
                            >
                                Start Quiz
                            </Button>
                        }
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Home;
