import Navbar from "../../components/Navbar";
import PostCard from "../../components/PostCard";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function postId() {
  return (
    <Box sx={{ backgroundColor: "#EEF0F1" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ height: "100vh" }}>
        <Box sx={{ marginTop: "1rem" }}>
          <PostCard />
        </Box>
      </Container>
    </Box>
  );
}
