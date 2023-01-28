import Box from "@mui/material/Box";

import { collection, getDocs, query, where } from "firebase/firestore";

import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import { db } from "../../lib/firebase";

export async function getServerSideProps(props) {
  const res = await getDocs(
    query(collection(db, "users"), where("uid", "==", props.query.id))
  );

  const user = res.docs[0].data();

  return {
    props: { user },
  };
}

const Index = ({ user }) => {
  const { displayName, photoURL } = user;

  return (
    <Box sx={{ backgroundColor: "#EEF0F1" }}>
      <Navbar />
      <Profile displayName={displayName} photoURL={photoURL} />
    </Box>
  );
};

export default Index;
