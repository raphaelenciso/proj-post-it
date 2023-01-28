//MUI COMPONENTS
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

//MUI STYLED
import styled from "@mui/system/styled";
import { AuthContext } from "../context/AuthContext";

import { useContext, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/router";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

export default function PostItModal({ modalOpen, setModalOpen }) {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const [postDetails, setPostDetails] = useState("");

  const postData = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        userUid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        postMessage: postDetails,
        dateCreated: new Date().toLocaleString(),
      });

      setModalOpen(false);
      setPostDetails("");
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StyledModal open={modalOpen} onClose={(e) => setModalOpen(false)}>
      <Box
        width={550}
        height={330}
        p="20px 25px"
        borderRadius={5}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        <Typography variant="h5" color="gray" textAlign="center" mb={1}>
          Post It
        </Typography>
        <UserBox>
          <Avatar src={currentUser.photoURL} />
          <Typography>{currentUser.displayName}</Typography>
        </UserBox>
        <TextField
          variant="standard"
          multiline
          rows={4}
          placeholder="What's on your mind?"
          sx={{ width: "100%", marginBottom: "2rem" }}
          onChange={(e) => setPostDetails(e.target.value)}
          value={postDetails}
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={postData}
          disabled={postDetails.length > 80 && true}
        >
          Post
        </Button>
      </Box>
    </StyledModal>
  );
}
