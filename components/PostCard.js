import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

import { useRouter } from "next/router";

export default function PostCard({ post }) {
  const router = useRouter();

  const { displayName, photoURL, postMessage, userUid, dateCreated } = post;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar src={photoURL} />}
        title={displayName}
        subheader={dateCreated}
        onClick={() => router.push(`/${userUid}`)}
        action={false && <Button>Edit</Button>}
      />

      <CardContent onClick={(e) => router.push(`/${userUid}/postid`)}>
        <Typography variant="body2" color="text.secondary">
          {postMessage}
        </Typography>
      </CardContent>
    </Card>
  );
}
