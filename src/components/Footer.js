import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import useTheme from "../customHooks/useTheme";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "5vh",
        fontSize: "1rem",
        lineHeight: "1.334",
        fontFamily: "monospace",
        fontWeight: "700",
        letterSpacing: ".3rem",
        ...theme.footer,
      }}
    >
      Credits
      <Link
        variant="subtitle"
        target="_blank"
        href="https://www.nytimes.com/games/wordle/index.html"
        sx={{ paddingLeft: "0.5rem" }}
      >
        Wordle
      </Link>
    </Paper>
  );
};

export default Footer;
