import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

interface ScoreDonutProps {
  score: number; // 0–100
}

export default function ScoreDonut({ score }: ScoreDonutProps) {
  const data = [
    {
      label: "Score",
      value: score,
      color: "#7E52A0"
    },
    {
      label: "Remaining",
      value: 100 - score,
      color: "rgba(230, 188, 205, 0.25)"
    }
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: 220,
        height: 220,
        margin: "0 auto",
        '& .MuiChartsLegend-root': {
          display: 'none'
        }
      }}
    >
      {/* Donut chart */}
      <PieChart
        series={[
          {
            innerRadius: 70,
            outerRadius: 100,
            data,
            paddingAngle: 2
          }
        ]}
        width={220}
        height={220}
      />

      {/* Center label */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#E6BCCD",
            fontWeight: 700,
            lineHeight: 1
          }}
        >
          {score}%
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "rgba(230, 188, 205, 0.7)"
          }}
        >
          Score
        </Typography>
      </Box>
    </Box>
  );
}