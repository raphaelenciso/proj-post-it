import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await getDocs(
    query(collection(db, "posts"), orderBy("dateCreated", "desc"))
  );

  if (!res) {
    return {
      notFound: true,
    };
  }

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
  return (
    <Box sx={{ backgroundColor: "#EEF0F1" }}>
      <Navbar />
      {posts && <Posts posts={posts} />}
    </Box>
    // <div>
    //   {posts.map((post) => {
    //     <h1>{post.postMessage}</h1>;
    //   })}
    // </div>
  );
}
