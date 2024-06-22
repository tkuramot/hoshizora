import React, { useState } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Box, Container, Grid } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    // TODO check if email and password are valid
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // TODO notify user of error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Container>
        <Grid>
          <Box className="my-2 justify-start">
            <Label className="text-left">メールアドレス</Label>
          </Box>
          <Input className="my-2" type="email" onChange={handleChangeEmail} />
          <Label className="text-left">パスワード</Label>
          <Input
            className="my-2 justify-start"
            type="password"
            onChange={handleChangePassword}
          />
          <Button onClick={handleLogin}>ログイン</Button>
        </Grid>
      </Container>
    </>
  );
}
