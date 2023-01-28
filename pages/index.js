import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export async function getServerSideProps() {
  const res = await getDocs(
    query(collection(db, "posts"), orderBy("dateCreated", "desc"))
  );

  const posts = res.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Index({ posts }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <Box sx={{ backgroundColor: "#EEF0F1" }}>
      <Navbar />
      {currentUser ? (
        <Posts posts={posts} />
      ) : (
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
      )}
    </Box>
  );
}
