import Navbar from "../../components/Navbar";
import PostCard from "../../components/PostCard";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Head from "next/head";

export async function getServerSideProps({ query: { postId } }) {
  const res = await getDoc(doc(db, "posts", postId));

  const post = { id: res.id, ...res.data(), postFocus: true };

  return {
    props: { post },
  };
}

export default function postId({ post }) {
  return (
    <>
      <Head>
        <title>View Post | Post It</title>
      </Head>
      <Box sx={{ backgroundColor: "#F5F5F5" }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ height: "100vh" }}>
          <Box sx={{ marginTop: "1rem" }}>
            <PostCard post={post} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
