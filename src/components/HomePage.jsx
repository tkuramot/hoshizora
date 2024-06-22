import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import RangeSlider from "./RangeSlider";
import Card from "./Card";
import ContentFetcher from "./ContentFetcher";

export default function HomePage() {
  return (
    <Container>
      <Grid container spacing={12}>
        <Grid item xs={4}>
          <RangeSlider />
        </Grid>
        <Grid item xs={4}>
          <Card />
        </Grid>
        <Grid item xs={4}>
          <Card />
        </Grid>
      </Grid>
      <ContentFetcher />
    </Container>
  );
}
