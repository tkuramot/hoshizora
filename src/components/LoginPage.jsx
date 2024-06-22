import React, { useState } from "react";

import { Box, Container, Grid } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    const from = location.state?.from || "/";

    // TODO check if email and password are valid
    auth.signin(email, password, () => {
      navigate(from, { replace: true });
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
