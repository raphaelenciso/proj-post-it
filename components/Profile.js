import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PostCard from "./PostCard";

const Profile = ({ displayName, photoURL }) => {
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
        <Avatar src={photoURL} sx={{ width: "100px", height: "100px" }} />
        <Typography variant="h4">{displayName}</Typography>
      </Card>
      {/* <Stack gap={2}>
        <PostCard />
        <PostCard />
        <PostCard />
      </Stack> */}
    </Container>
  );
};
export default Profile;
