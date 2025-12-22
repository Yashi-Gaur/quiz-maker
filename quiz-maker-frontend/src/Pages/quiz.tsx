import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
  } from "@mui/material";
import PixelBlast from "@/components/PixelBlast";
import ProgressWithLabel from "@/components/progressWithLabel";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  

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
            <div style={{ 
                position: 'relative', 
                zIndex: 1, 
                padding: '2rem', 
                height: "500px",
                width: "700px",
                backgroundColor: "rgba(0, 0, 0, 0.2)", // 🔑 translucent black
                backdropFilter: "blur(4px)",          // optional but 🔥
                borderRadius: "16px",
            }}>
                <Typography
                    variant="h4"
                    sx={{
                    color: "#E6BCCD",
                    marginBottom: "25px"
                    }}
                >
                    {topic}
                </Typography>

                <ProgressWithLabel current={qno} total={questions.length} />
                <div 
                    style={{
                        width: "560px",
                        margin: "0 auto", 
                        marginTop: "40px",         
                        display: "flex",
                        flexDirection: "column",   
                        alignItems: "flex-start",
                        gap: "20px"
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#E6BCCD",
                        }}
                    >
                        {questions[qno]}
                    </Typography>

                    <RadioGroup
                        value={userAnswers[qno] ?? ""}
                        onChange={(e) =>
                        handleSelect(qno, Number(e.target.value))
                        }
                        sx={{ marginBottom: "5px" }}
                    >
                        {options[qno].map((opt: string, oIndex: number) => (
                        <FormControlLabel
                            key={oIndex}
                            value={oIndex + 1}
                            control={
                            <Radio
                                sx={{
                                color: "#E6BCCD",
                                "&.Mui-checked": {
                                    color: "#7E52A0"
                                }
                                }}
                            />
                            }
                            label={
                            <Typography sx={{ color: "#E6BCCD" }}>
                                {opt}
                            </Typography>
                            }
                        />
                        ))}
                    </RadioGroup>

                    <Box sx={{ 
                        width: "560px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between", // 🔑 push apart
                        alignItems: "center" 
                    }}>
                        <Button
                            variant="outlined"
                            onClick={handlePrevious}
                            disabled={qno === 0}
                            sx={{
                                width: "150px",
                                borderColor: "#7E52A0",
                                color: "#7E52A0",
                                borderRadius: "999px",
                                backgroundColor: "rgba(126, 82, 160, 0.15)",

                                "&:hover": {
                                borderColor: "#7E52A0",
                                backgroundColor: "rgba(126, 82, 160, 0.35)"
                                },

                                "&.Mui-disabled": {
                                opacity: 0.4
                                }
                            }}
                            startIcon={<ArrowBackIcon />}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                                width: "150px",
                                backgroundColor: "#7E52A0",
                                color: "#020409",
                                borderRadius: "999px",

                                "&:hover": {
                                backgroundColor: "#6A4290"
                                }
                            }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            {qno === 9 ? "Submit" : "Next"}
                        </Button>
                    </Box>
                </div>
            </div>
        </div>

    )
}

export default Quiz;