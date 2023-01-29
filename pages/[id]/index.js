import Box from "@mui/material/Box";

import { collection, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";

import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import { db } from "../../lib/firebase";

export async function getServerSideProps(props) {
  const res = await getDocs(
    query(collection(db, "users"), where("uid", "==", props.query.id))
  );

  const res2 = await getDocs(
    query(collection(db, "posts"), where("userUid", "==", props.query.id))
  );

  if (!res || !res2) {
    return {
      notFound: true,
    };
  }
  const user = res.docs[0].data();
  const userPosts = res2.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    props: { user, userPosts },
  };
}

const Index = ({ user, userPosts }) => {
  const { displayName, photoURL } = user;

  return (
    <>
      <Head>
        <title>{displayName} | Post It</title>
      </Head>
      <Box sx={{ backgroundColor: "#F5F5F5" }}>
        <Navbar />

        <Profile
          displayName={displayName}
          photoURL={photoURL}
          userPosts={userPosts}
        />
      </Box>
    </>
  );
};

export default Index;
