import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const IndexNote = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        marginY: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        paddingY: "1rem",
        maxWidth: "500px",
        margin: "1rem auto",
      }}
    >
      <Typography variant="h4">Login to see posts</Typography>
    </Card>
  );
};
export default IndexNote;
