import React from "react"
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy"
import MovieIcon from "@mui/icons-material/Movie"
import { Routes, Route, Link } from "react-router-dom"
import { Helmet } from "react-helmet"

import GenreAdmin from "../components/Genre/GenreAdmin"
import MovieAdmin from "../components/Movie/MovieAdmin"

const Dashboard: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs>
          <List>
            <Link
              to="genres"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TheaterComedyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Genres" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to="movies"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MovieIcon />
                  </ListItemIcon>
                  <ListItemText primary="Movies" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Routes>
          <Route path="/genres" element={<GenreAdmin />} />
          <Route path="/movies" element={<MovieAdmin />} />
        </Routes>
      </Grid>
    </>
  )
}

export default Dashboard
