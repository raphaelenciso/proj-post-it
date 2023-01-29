import Box from "@mui/material/Box";

import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import IndexNote from "../components/IndexNote";

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
      {currentUser ? <Posts posts={posts} /> : <IndexNote />}
    </Box>
  );
}
