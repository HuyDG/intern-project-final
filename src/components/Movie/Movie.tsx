import React from "react"
import { Paper, Skeleton, Stack, Typography } from "@mui/material"

const Movie: React.FC = () => {
  return (
    <Paper elevation={3}>
      <Stack spacing={3} p={5}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Typography variant="h5" textAlign="center" noWrap>
          Title
        </Typography>
      </Stack>
    </Paper>
  )
}

export default Movie
