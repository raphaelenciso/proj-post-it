import PostCard from "./PostCard";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

export default function Posts({ posts }) {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "1rem", height: "100vh" }}>
      <Stack gap={2}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
}
