import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PurpleButton = styled(Button)({
  borderColor: "#27a4d5",
  color: "#fff",
  backgroundColor: "#27a4d5",
  width: "25rem", // Default width

  "&:hover": {
    backgroundColor: "#026a93",
    borderColor: "#27a4d5",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#026a93",
    borderColor: "#27a4d5",
    boxShadow: "none",
  },

  "@media (max-width: 415px)": {
    width: "20rem",
  },
});

export default PurpleButton;
