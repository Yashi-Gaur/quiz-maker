import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const RoundedInput = styled(TextField)({
  width: "520px", 
  
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  borderRadius: "999px",

  "& .MuiOutlinedInput-root": {
    height: "45px",
    borderRadius: "999px",
    color: "#FFFFFF",
    paddingLeft: "8px",
    
    "& fieldset": {
      borderColor: "transparent"
    },

    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)"
    },

    "&.Mui-focused fieldset": {
      borderColor: "#E6BCCD"
    }
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    top: "50%",
    transform: "translate(20px, -50%) scale(1)",
    transformOrigin: "left center"
  },
  "& .MuiOutlinedInput-input": {
        height: "45px",
        padding: "0 16px",
        boxSizing: "border-box",
        lineHeight: "45px"
    },

  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink": {
    top:-5,
    transform: "translate(20px, -6px) scale(0.75)",
    color: "#E6BCCD",
  }
});

export default RoundedInput;

// // 🔹 CENTERED label (resting)
// "& .MuiInputLabel-root": {
//     color: "rgba(255, 255, 255, 0.6)",
//     top: "50%",
//     transform: "translate(20px, -50%) scale(1)",
//     transformOrigin: "left center"
//   },

//   // 🔹 Floating label
//   "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink": {
//     top: 0,
//     transform: "translate(20px, -6px) scale(0.75)",
//     color: "#BE3144"
//   }