import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Paper,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material"
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridLoadingOverlay,
  GridNoRowsOverlay,
  GridCellParams,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid"
import moment from "moment"

import { Movie, movieData } from "../../config/constants"
import { useFetchGenresQuery } from "../../features/genre/genreApi"
import { movieApi, useFetchMoviesQuery } from "../../features/movie/movieApi"

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "genres",
    headerName: "Genres",
    width: 150,
  },
  {
    field: "releaseDate",
    headerName: "Release date",
    width: 150,
  },
  {
    field: "voteAverage",
    headerName: "Vote average",
    type: "number",
    width: 150,
  },
  {
    field: "voteCount",
    headerName: "Vote count",
    type: "number",
    width: 150,
  },
  {
    field: "viewCount",
    headerName: "View count",
    type: "number",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "createAt",
    headerName: "Create at",
    width: 200,
    valueFormatter: (params: GridValueFormatterParams<any>) =>
      moment(params.value).format("DD-MM-yyyy h:mm:ss a"),
  },
  {
    field: "updateAt",
    headerName: "Update at",
    width: 200,
    valueFormatter: (params: GridValueFormatterParams<any>) =>
      moment(params.value).format("DD-MM-yyyy h:mm:ss a"),
  },
]

const MovieAdmin: React.FC = () => {
  const [formData, setFormData] = useState<Movie>(movieData)
  const { data: genres } = useFetchGenresQuery("")
  const { data, isFetching } = useFetchMoviesQuery("")
  const [triggerCreate, createResult] =
    movieApi.endpoints.createMovie.useLazyQuery()

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<any>
  ) =>
    setFormData((prevState) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }))

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const file: any = event.target.files?.[0]
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) =>
      setFormData((prevState) => ({
        ...formData,
        [name]: event.target?.result,
      }))

    reader.readAsDataURL(file)
  }

  const handleCellClick = (params: GridCellParams<any, any, any>) => {
    const movie = data?.find((item) => item._id === params.id)

    if (!movie) return

    setFormData((prevState) => ({
      title: movie.title,
      posterImage: movie.posterImage,
      bannerImage: movie.bannerImage,
      genres: movie.genres,
      releaseDate: movie.releaseDate,
      voteAverage: movie.voteAverage,
      voteCount: movie.voteCount,
      viewCount: movie.viewCount,
      status: movie.status,
    }))
  }

  const handleDelete = () => {}

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    triggerCreate(formData)
    setFormData((prevState) => movieData)
  }

  const actions: GridColDef[] = [
    {
      field: "id",
      headerName: "Delete",
      renderCell: (params: GridRenderCellParams<any, any, any>) => (
        <Button
          id={params.value}
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Box component="form" onSubmit={handleSubmit} p={3}>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom>
                Movie
              </Typography>
              <TextField label="Title" name="title" onChange={handleChange} />
              <FormControl>
                <TextField
                  type="file"
                  name="posterImage"
                  onChange={handleFileChange}
                />
                <FormHelperText>Upload poster image</FormHelperText>
              </FormControl>
              <FormControl>
                <TextField
                  type="file"
                  name="bannerImage"
                  onChange={handleFileChange}
                />
                <FormHelperText>Upload banner image</FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel id="genres">Genres</InputLabel>
                <Select
                  labelId="genres"
                  label="Genres"
                  name="genres"
                  value={formData.genres}
                  onChange={handleChange}
                  multiple
                >
                  {genres?.map((genre, index) => (
                    <MenuItem key={index} value={genre._id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="date"
                label="Release date"
                name="releaseDate"
                onChange={handleChange}
              />
              <TextField
                type="number"
                label="Vote average"
                name="voteAverage"
                inputProps={{ min: 0, max: 10, step: 0.1 }}
                onChange={handleChange}
              />
              <TextField
                type="number"
                label="Vote count"
                name="voteCount"
                inputProps={{ min: 0 }}
                onChange={handleChange}
              />
              <TextField
                type="number"
                label="View count"
                name="viewCount"
                inputProps={{ min: 0 }}
                onChange={handleChange}
              />
              <FormControl>
                <InputLabel id="movie-status">Status</InputLabel>
                <Select
                  labelId="movie-status"
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Upcoming">Upcoming</MenuItem>
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Finished">Finished</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ height: 400, p: 3 }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: GridLoadingOverlay,
              NoRowsOverlay: GridNoRowsOverlay,
            }}
            rows={!data ? [] : data.map((item) => ({ ...item, id: item._id }))}
            columns={[...columns, ...actions]}
            loading={isFetching}
            onCellClick={handleCellClick}
          />
        </Paper>
      </Grid>
      <Snackbar
        open={createResult.isSuccess}
        autoHideDuration={3000}
        message={createResult.data?.message}
      />
    </>
  )
}

export default MovieAdmin
