import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PostCard({ post }) {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  console.log(currentUser);

  const {
    displayName,
    photoURL,
    postMessage,
    userUid,
    dateCreated,
    postFocus,
    id,
  } = post;

  return (
    <>
      {post && (
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar
                src={photoURL}
                onClick={() => router.push(`/${userUid}`)}
              />
            }
            title={displayName}
            subheader={dateCreated}
            action={
              postFocus &&
              currentUser.uid === userUid && (
                <Button onClick={(e) => console.log("qwe")}>Edit</Button>
              )
            }
          />

          <CardContent
          // onClick={!postFocus ? () => router.push(`/${userUid}/${id}`) : null}
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
