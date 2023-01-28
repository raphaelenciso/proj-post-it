import Box from "@mui/material/Box";

import { collection, getDocs, query, where } from "firebase/firestore";

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
    <Box sx={{ backgroundColor: "#EEF0F1" }}>
      <Navbar />

      <Profile
        displayName={displayName}
        photoURL={photoURL}
        userPosts={userPosts}
      />
    </Box>
  );
};

export default Index;
