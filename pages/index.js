import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";

// export async function getServerSideProps() {
//   const res = await getDocs(
//     query(collection(db, "posts"), orderBy("dateCreated", "desc"))
//   );

//   if (!res) {
//     return {
//       notFound: true,
//     };
//   }

//   const posts = res.docs.map((doc) => {
//     return { id: doc.id, ...doc.data() };
//   });

//   return {
//     props: {
//       posts,
//     },
//   };
// }

export default function Index() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDocs(
        query(collection(db, "posts"), orderBy("dateCreated", "desc"))
      );

      const posts = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setPosts(posts);
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
