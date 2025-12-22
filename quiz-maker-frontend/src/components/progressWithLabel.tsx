import { Box, LinearProgress, Typography } from "@mui/material";

interface ProgressWithLabelProps {
  current: number; // zero-based index (qno)
  total: number;
}

const ProgressWithLabel = ({ current, total }: ProgressWithLabelProps) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <Box sx={{ width: "600px", margin: "0 auto", marginBottom: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px"
        }}
      >
        <Typography sx={{ color: "#E6BCCD" }}>
          Question {current + 1} of {total}
        </Typography>

        <Typography sx={{ color: "#E6BCCD" }}>
          {Math.round(progress)}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: "8px",
          borderRadius: "999px",
          backgroundColor: "rgba(230, 188, 205, 0.2)",

          "& .MuiLinearProgress-bar": {
            backgroundColor: "#7E52A0",
            borderRadius: "999px"
          }
        }}
      />
    </Box>
  );
};

export default ProgressWithLabel;