import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";

export default function Index() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDocs(
        query(collection(db, "posts"), orderBy("dateCreated", "desc"))
      );

      if (!res) {
        return {
          notFound: true,
        };
      }

      const fetchedPosts = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setPosts(fetchedPosts);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#EEF0F1" }}>
      <Navbar />
      {posts && <Posts posts={posts} />}
    </Box>
  );
}
