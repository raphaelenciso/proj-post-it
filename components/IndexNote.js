import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const IndexNote = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
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
    </Container>
  );
};
export default IndexNote;
