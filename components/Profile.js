import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  Stack,
  Typography,
} from "@mui/material";
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
