import PostCard from "./PostCard";
import Stack from "@mui/material/Stack";

export default function Posts({ posts }) {
  return (
    <Stack gap={1}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Stack>
  );
}
