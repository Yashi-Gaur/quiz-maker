import { useLocation, useNavigate} from "react-router-dom";
import {
    Typography,
    Button,
    Box,
  } from "@mui/material";
import PixelBlast from "@/components/PixelBlast";
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import ScoreDonut from "@/components/donutChartWithScore";

function Result() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { url, topic, questions, options, answers, score } = state;
    const percent = score*10;

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
                    {percent >= 70? "Congratulations!!": "You can do better :("}
                </Typography>
                <ScoreDonut score = {percent}/>
                <Box sx={{ 
                    width: "560px",
                    margin: "0 auto",
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <Button
                        variant="outlined"
                        onClick={handleRetry}
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
                        startIcon={<ReplayIcon />}
                    >
                        Retry
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleHome}
                        sx={{
                            width: "150px",
                            backgroundColor: "#7E52A0",
                            color: "#020409",
                            borderRadius: "999px",

                            "&:hover": {
                            backgroundColor: "#6A4290"
                            }
                        }}
                        endIcon={<HomeIcon />}
                    >
                        New quiz
                    </Button>
                </Box>
            </div>
        </div>
    )
}

export default Result;