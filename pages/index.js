import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import IndexNote from "../components/IndexNote";

const LIMIT = 10;

export async function getServerSideProps() {
  const res = await getDocs(
    query(collection(db, "posts"), orderBy("dateCreated", "desc"), limit(LIMIT))
  );

  //this is just a test

  const posts = res.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    props: { posts },
  };
}

export default function Index(props) {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState(props.posts);
  const [postsEnd, setPostsEnd] = useState(posts.length < LIMIT ? true : false);

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  const getMorePosts = async () => {
    const last = posts[posts.length - 1];

    const res = await getDocs(
      query(
        collection(db, "posts"),
        orderBy("dateCreated", "desc"),
        startAfter(last.dateCreated),
        limit(LIMIT)
      )
    );

    const newPosts = res.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    setPosts(posts.concat(newPosts));

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5F5" }}>
      <Navbar />
      {posts && (
        <Container
          maxWidth="lg"
          sx={{ marginTop: "1rem", minHeight: "100vh", paddingX: "2px" }}
        >
          {currentUser ? (
            <>
              <Posts posts={posts} />
              {!postsEnd && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ my: "1rem" }}
                  onClick={getMorePosts}
                >
                  Load more
                </Button>
              )}
              {posts.length !== 0 && postsEnd && (
                <Typography variant="h5" marginY={2}>
                  You have reached the end!
                </Typography>
              )}
              {posts.length === 0 && (
                <Typography variant="h5" marginY={2}>
                  No posts found!
                </Typography>
              )}
            </>
          ) : (
            <IndexNote />
          )}
        </Container>
      )}
    </Box>
  );
}
