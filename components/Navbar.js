import Image from "next/image";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

import { signInWithPopup, signOut } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

import faviconLogo from "../public/favicon.svg";
import PostItModal from "./PostItModal";
import Link from "../src/Link";
import { auth, provider, db } from "../lib/firebase";

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);

  const login = async () => {
    const res = await signInWithPopup(auth, provider);

    const { uid, email, displayName, photoURL } = res.user;

    const checkEmail = await getDoc(doc(db, "users", email));

    if (!checkEmail.data()) {
      await setDoc(doc(db, "users", email), {
        uid,
        email,
        displayName,
        photoURL,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {currentUser && (
        <PostItModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <StyledToolbar>
            <StyledBox>
              <Link href="/" sx={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={faviconLogo}
                  width={50}
                  height={50}
                  style={{ marginRight: "1rem" }}
                  alt="avatar"
                />
              </Link>
              <Typography
                variant="h4"
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", sm: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Post It
              </Typography>
            </StyledBox>
            {currentUser ? (
              <StyledBox sx={{ gap: "1rem" }}>
                <Button
                  variant="contained"
                  disableElevation
                  size="large"
                  sx={{
                    backgroundColor: "primary.light",
                  }}
                  onClick={(e) => setModalOpen(true)}
                >
                  Post
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  size="large"
                  sx={{
                    backgroundColor: "secondary.light",
                  }}
                  onClick={logout}
                >
                  Logout
                </Button>
                {/* <Link href={`/${currentUser.uid}`}> */}
                <Avatar
                  src={currentUser.photoURL}
                  sx={{ height: "50px", width: "50px" }}
                />
                {/* </Link> */}
              </StyledBox>
            ) : (
              <Button
                variant="contained"
                disableElevation
                size="large"
                sx={{
                  backgroundColor: "primary.light",
                }}
                onClick={login}
              >
                Login
              </Button>
            )}
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
}
