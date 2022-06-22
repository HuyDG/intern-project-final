import React, { useState } from "react"
import { Grid, Grow, Tabs, Tab } from "@mui/material"
import { Helmet } from "react-helmet"

import Movie from "../components/Movie/Movie"

const Home: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0)

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue((prevState) => newValue)

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Grow in>
        <Grid container spacing={3} py={5}>
          <Grid item xs>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Popular" />
              <Tab label="Trending" />
              <Tab label="Upcoming" />
              <Tab label="High rating" />
              <Tab label="Most comments" />
              <Tab label="Recently" />
            </Tabs>
            <Movie />
          </Grid>
        </Grid>
      </Grow>
    </>
  )
}

export default Home
