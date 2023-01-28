import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import PostItModal from "./PostItModal";

export default function PostCard({ post }) {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const {
    displayName,
    photoURL,
    postMessage,
    userUid,
    dateCreated,
    postFocus,
    id,
  } = post;

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", id));

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    setModalOpen(true);
    // try {
    //   router.push("/");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      {post && (
        <Card variant="outlined">
          {modalOpen && (
            <PostItModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              edit={true}
              postMessage={postMessage}
              postId={id}
              userUid={userUid}
            />
          )}
          <CardHeader
            avatar={
              <Avatar
                src={photoURL}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => router.push(`/${userUid}`)}
              />
            }
            title={displayName}
            subheader={dateCreated}
            action={
              postFocus &&
              currentUser.uid === userUid && (
                <>
                  <Button variant="warning" onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button onClick={handleEdit}>Edit</Button>
                </>
              )
            }
          />

          <CardContent
            onClick={!postFocus ? () => router.push(`/${userUid}/${id}`) : null}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2" color="text.secondary">
              {postMessage}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
