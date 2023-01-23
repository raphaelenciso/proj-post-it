import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Link from "../src/Link";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function getServerSideProps() {
  const res = await getDocs(
    query(collection(db, "posts"), orderBy("dateCreated", "desc"))
  );

  const posts = res.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    props: {
      posts: JSON.stringify(posts),
    },
  };
}

export default function Index({ posts }) {
  return (
    <Box sx={{ backgroundColor: "#EEF0F1" }}>
      <Navbar />
      <Posts posts={JSON.parse(posts)} />
    </Box>
  );
}
